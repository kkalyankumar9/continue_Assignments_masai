// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthState } from "../redux/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, user } = useSelector((state) => state.auth);

  // Redirect if logged in
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  // Clear auth messages/errors on unmount
  useEffect(() => {
    return () => dispatch(clearAuthState());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-10">
      <div className="w-full max-w-md sm:max-w-lg bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center mb-8 text-slate-800">
          Login
        </h1>

        {/* Messages */}
        {error && (
          <p className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm sm:text-base text-center">
            {error}
          </p>
        )}
        {message && (
          <p className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 text-sm sm:text-base text-center">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              className="block text-slate-700 font-semibold mb-2 text-base sm:text-lg"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-12 sm:h-14 rounded-xl border border-slate-300 px-4 sm:px-5 text-base sm:text-lg placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-slate-700 font-semibold mb-2 text-base sm:text-lg"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full h-12 sm:h-14 rounded-xl border border-slate-300 px-4 sm:px-5 text-base sm:text-lg placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 sm:h-14 rounded-xl font-semibold text-base sm:text-lg shadow-sm transition
              ${loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"}
            `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 flex items-center justify-between text-sm sm:text-base text-slate-600">
          <button
            onClick={() => navigate(-1)}
            className="underline underline-offset-2 hover:text-slate-800"
          >
            Back
          </button>
          <Link
            to="/register"
            className="font-medium text-blue-700 hover:underline underline-offset-2"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
