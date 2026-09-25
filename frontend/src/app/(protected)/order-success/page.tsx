"use client";

import Link from "next/link";

export default function OrderSuccess() {
  return (
    <main className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>
          Order Placed Successfully!
        </h1>

        <p>
          Thank you for shopping with E-Shop.
          Your order has been received.
        </p>

        <div className="success-buttons">

          <Link
            href="/"
            className="buy-btn"
          >
            Continue Shopping
          </Link>

          <Link
            href="/cart"
            className="cart-btn"
          >
            View Cart
          </Link>

        </div>

      </div>

    </main>
  );
}