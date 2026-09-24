"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

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
      console.log("LOGIN BUTTON CLICKED");

      const response = await fetch(
        "http://127.0.0.1:8001/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      // Login failed
      if (!response.ok) {
        setError(data.detail || "Invalid email or password");
        return;
      }

      // Save JWT token
      localStorage.setItem(
        "access_token",
        data.access_token
      );

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setMessage("Login successful!");

      // Move to home page
      router.push("/");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to the server. Please make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");

    // Google OAuth will be implemented later.
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h1>Welcome Back</h1>

        <p className="subtitle">
          Login to your account
        </p>

        <form onSubmit={handleSubmit}>

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

          {/* Login Button */}
          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        {/* Divider */}
        <div className="divider">
          <span>OR</span>
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="google-button"
          onClick={handleGoogleLogin}
        >
          <span className="google-icon">
            G
          </span>

          Continue with Google
        </button>

        {/* Register */}
        <p className="login-text">
          Don't have an account?{" "}

          <a href="/register">
            Register
          </a>
        </p>

      </div>
    </div>
  );
}