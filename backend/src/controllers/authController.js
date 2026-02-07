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
      { expiresIn: "1h" }
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
