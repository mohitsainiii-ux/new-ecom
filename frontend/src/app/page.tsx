"use client";

import { useEffect, useState } from "react";
const apiRequest = async (path: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001"}${path}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const data = await apiRequest("/health");

        setMessage(data.message);
      } catch (error) {
        console.error(error);
        setError("FastAPI backend is not connected");
      } finally {
        setLoading(false);
      }
    };

    checkBackend();
  }, []);

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold">
        E-Commerce
      </h1>

      {loading && (
        <p className="mt-5">
          Checking backend...
        </p>
      )}

      {message && (
        <p className="mt-5 text-green-600">
          Backend Connected: {message}
        </p>
      )}

      {error && (
        <p className="mt-5 text-red-600">
          {error}
        </p>
      )}
    </main>
  );
}