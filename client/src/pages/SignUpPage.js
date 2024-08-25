import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import useUser hook

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser(); // Get login function from context

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://alma-movie-fullstack.onrender.com/api/auth/register",
        {
          email,
          password,
          name,
        }
      );
      const { user, token } = response.data;
      login(user, token); // Use login function from context
      navigate("/");
    } catch (err) {
      setError("An error occurred during sign up.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form
        onSubmit={handleSignUp}
        className="bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-white mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
