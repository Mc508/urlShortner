import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../api/user.api.js";
import { login } from "../store/slice/authSlice.js";
function LoginForm({ state }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(username, password);
      dispatch(login(data.user));
      setLoading(false);
      console.log("User logged in successfully");
      navigate({ to: "/dashboard" });
    } catch (error) {
      setLoading(false);
      setError(error.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg text-center font-bold mb-4">Login</h2>
      <div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          className="w-full bg-orange-600 text-white py-2 rounded-xl hover:bg-orange-800 transition"
          type="submit"
          onClick={handleSubmit}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
      <div className="text-center mt-4">
        <p className="cursor-pointer text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => state(false)}
            className="text-blue-500 hover:text-blue-700"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
