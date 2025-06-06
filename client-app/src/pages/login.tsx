import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/authservice';
import Book from '../assets/book.svg';
import {toast} from 'react-toastify';


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: setAuthTokens } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(username.trim() === '' || password.trim() === '') {
      toast.error('Please enter your username and password');
      return;
    }

    try {
      const tokens = await login({ user_name: username, password });
      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);
      localStorage.setItem("tokens", JSON.stringify(tokens));

    setAuthTokens(tokens);
      setAuthTokens(tokens);
      sessionStorage.setItem('username', username);
      
      navigate('/dashboard'); // Redirect to dashboard after login
    } catch (err) {
      setError('Invalid username or password');
    }
  };


  return (
    <div className="flex flex-col justify-center items-center h-screen w-1/2 bg-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md text-center">
        <img src={Book} alt="Library Logo" className="mb-4 mx-auto" />
        <h2 className="text-2xl font-bold mb-2">HSMSS Library Management System</h2>
        <p className="text-lg mb-6">Please enter your credentials</p>
       
        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-4/5 mx-auto p-3 border border-black rounded-full text-center text-gray-600 text-lg"
            required
          />
        </div>
       
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-4/5 mx-auto p-3 border border-black rounded-full text-center text-gray-600 text-lg"
            required
          />
        </div>

        <div className="w-3/5 mx-auto flex flex-col items-start">
          <span className="mb-2 text-sm">Forgot Password?</span>
          <button
            type="submit"
            className="bg-[#255d81] text-white py-3 px-20 rounded-full font-bold text-lg"
          >
            Log In
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>

      <div className="right">
        
      </div>
    </div>
  );
};

export default Login;