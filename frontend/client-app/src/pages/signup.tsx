import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/authservice";
import Book from "../assets/book.svg";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login: setAuthTokens } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      toast.error("Please enter your username and password");
      return;
    }

    try {
      const tokens = await login({ user_name: username, password });
      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);
      localStorage.setItem("tokens", JSON.stringify(tokens));

      setAuthTokens(tokens);
      setAuthTokens(tokens);
      sessionStorage.setItem("username", username);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid username or password");
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-poppins">
      <div className="flex flex-wrap w-full max-w-5xl bg-white shadow-lg">
        {/* Login Section */}
        <div className="w-full md:w-1/2 p-10 bg-white">
          <div className="text-center mb-6">
            <img src={Book} alt="Book Icon" className="mx-auto mb-2 w-40" />
            <h2 className="text-2xl font-bold">
              HSMSS Library Management System
            </h2>
            <p className="text-gray-600 mt-2">Please enter your credentials</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
                placeholder="Username"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
                placeholder="Password"
              />
            </div>

            <a href="#" className="text-sm text-[#255D81] mb-4 inline-block">
              Forgot Password?
            </a>

            <button
              type="submit"
              className="w-full bg-[#255D81] text-white py-3 rounded hover:bg-[#1e4a65]"
            >
              Log In
            </button>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </form>
        </div>

        {/* Register Section */}
        <div className="w-full md:w-1/2 bg-[#255D81] text-white p-10 flex flex-col justify-center items-center text-center">
          <img src={Book} alt="Book Icon" className="w-24 mb-4" />
          <h2 className="text-3xl font-bold mb-2">HSMSS</h2>
          <h2 className="text-3xl font-bold mb-6">Library</h2>
          <p className="text-lg mb-6">New to our platform?</p>
          <h5 className="text-xl mb-6">Register Now</h5>
          <button
            onClick={() => navigate("#")}
            className="bg-[#D9D9D9] text-[#255D81] font-bold py-2 px-6 rounded hover:bg-[#041925] hover:text-white border border-transparent hover:border-white transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
