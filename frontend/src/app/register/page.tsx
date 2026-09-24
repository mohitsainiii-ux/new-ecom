"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      console.log("REGISTER BUTTON CLICKED");

      const response = await fetch(
        "http://127.0.0.1:8001/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("API RESPONSE:", data);

      if (!response.ok) {
        setError(data.detail || "Registration failed");
        return;
      }

      setMessage(data.message || "Registration successful!");

      // Clear form after successful registration
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        "Unable to connect to the server. Please make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    console.log("Google registration clicked");

    // Google OAuth will be implemented later.
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h1>Create Account</h1>

        <p className="subtitle">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <label htmlFor="name">
            Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email */}
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />

          {/* Error */}
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {/* Success */}
          {message && (
            <p className="success-message">
              {message}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        {/* Divider */}
        <div className="divider">
          <span>OR</span>
        </div>

        {/* Google */}
        <button
          type="button"
          className="google-button"
          onClick={handleGoogleRegister}
        >
          <span className="google-icon">
            G
          </span>

          Continue with Google
        </button>

        {/* Login */}
        <p className="login-text">
          Already have an account?{" "}
          <a href="/login">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}