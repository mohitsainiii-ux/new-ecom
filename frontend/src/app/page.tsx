"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function HomePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Get token
    const token = localStorage.getItem(
      "access_token"
    );

    // Get user
    const storedUser = localStorage.getItem(
      "user"
    );

    // No token or user
    if (!token || !storedUser) {
      router.replace("/login");
      return;
    }

    try {
      const parsedUser: User =
        JSON.parse(storedUser);

      setUser(parsedUser);
      setChecking(false);

    } catch (error) {
      console.error(
        "User data error:",
        error
      );

      // Remove invalid data
      localStorage.removeItem(
        "access_token"
      );

      localStorage.removeItem("user");

      router.replace("/login");
    }
  }, [router]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem("user");

    router.replace("/login");
  };

  // While checking authentication
  if (checking) {
    return (
      <main
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>
          Checking authentication...
        </h2>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "50px",
        textAlign: "center",
      }}
    >
      <h1>
        Welcome to EcomStore 🎉
      </h1>

      {user && (
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <h2>
            Welcome, {user.name} 👋
          </h2>

          <p>
            Email: {user.email}
          </p>

          <p>
            Role: {user.role}
          </p>

          <p>
            User ID: {user.id}
          </p>

          <button
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              border: "none",
              borderRadius: "8px",
              background: "#dc2626",
              color: "white",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </main>
  );
}