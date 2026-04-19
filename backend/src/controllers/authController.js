import prisma from "../config/prismaClient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const emailExist = await prisma.user.findUnique({
      where: { email },
    });

    if (emailExist) {
      return res.status(400).json({ message: "Email already exist!!" });
    }

    const userExist = await prisma.user.findUnique({
      where: { username },
    });

    if (userExist) {
      return res.status(400).json({ message: "Username already exist!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profile_picture: "https://ui-avatars.com/api/?name=" + username + "&background=random",
      },
    });

    const token = jwt.sign(
      { userId: newUser.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      user: {
        user_id: newUser.user_id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error during signup: ", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: userExist.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      user_id: userExist.user_id,
      username: userExist.username,
      email: userExist.email,
    };

    res.status(200).json({ user: safeUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, please try again later!" });
  }
};








import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture } = payload;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    // Create user if not exists
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          username: email.split("@")[0] + "_" + Date.now(),
          password: null,
          profile_picture: picture,
        },
      });
    }

    // Block check (good practice)
    if (user.is_blocked) {
      return res.status(403).json({ message: "User is blocked" });
    }

    const jwtToken = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
      },
      token: jwtToken,
    });

  } catch (error) {
    console.error("Google auth error:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
};