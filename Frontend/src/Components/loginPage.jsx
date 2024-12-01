// src/Components/LoginPage.jsx
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(email,password)
      const response = await axios.post(
        "http://localhost:9000/member/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = response.statusText;
      localStorage.setItem("token", response.data.token);


      if (data == "OK") {
        // Redirect to dashboard or home page
        navigate("/dashboard"); // Pass decodedToken to the dashboard
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            required
            autoComplete="current-password" // Add this line
          />
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => navigate("/forgot-password")}
          className="text-blue-500 hover:underline"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
