import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", response.data.token);

      setMessage("Login Successful!");
      console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
      setMessage("Login Failed!");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <h2>Login</h2>

      <div className="flex flex-col border p-10 rounded-2xl">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-black"
        />
        <br></br>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-black"
        />
        <br></br>

        <button
          onClick={handleLogin}
          className="bg-white text-black rounded-2xl"
        >
          Login
        </button>

        <p>{message}</p>
      </div>
    </div>
  );
}
