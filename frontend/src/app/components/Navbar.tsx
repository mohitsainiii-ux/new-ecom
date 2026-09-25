"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const router = useRouter();
  const { cart } = useCart();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.replace("/login");
  };

  return (
    <header className="navbar">
      <Link href="/" className="logo">
        E-Shop
      </Link>

      <nav className="nav-links">
        <Link href="/">Home</Link>

        <Link href="/cart">
          Cart ({cartCount})
        </Link>

        <Link href="/about">
          About
        </Link>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}