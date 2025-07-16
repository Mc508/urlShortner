import React, { useState } from "react";
import { registerUser } from "../api/user.api";
import { useNavigate } from "@tanstack/react-router";

function RegisterForm({ state }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    // TO DO: Add authentication logic here
    try {
      console.log("Registering user...");
      setLoading(true);
      const data = await registerUser(name, email, password);
      console.log(data);
      setLoading(false);
      console.log("User registered successfully");
      navigate({ to: "/dashboard" });
    } catch (error) {
      setLoading(false);
      setError(error.message || "Register failed");
    }
    console.log(`Username: ${email}, Password: ${password}`);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg text-center font-bold mb-4">Register</h2>
      <div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <button
          className="w-full bg-orange-600 text-white py-2 rounded-xl cursor-pointer hover:bg-orange-800 transition"
          type="submit"
          onClick={handleSubmit}
        >
          {loading ? "Registering..." : " Register"}
        </button>
      </div>
      <div className="text-center mt-4">
        <p className="cursor-pointer text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => state(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
