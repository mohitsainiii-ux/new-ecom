"use client";

import Link from "next/link";
import { useCart } from "../../../context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <h1>Your Cart is Empty</h1>

          <p>
            Add some products to your cart.
          </p>

          <Link
            href="/"
            className="buy-btn"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">

      <h1>Shopping Cart</h1>

      <div className="cart-layout">

        <div className="cart-items">

          {cart.map((item) => (
            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-info">

                <h3>{item.name}</h3>

                <p>
                  ₹
                  {item.price.toLocaleString(
                    "en-IN"
                  )}
                </p>

                <div className="quantity">

                  <button
                    onClick={() =>
                      decreaseQuantity(
                        item.id
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(
                        item.id
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>

            <span>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>

          <Link
            href="/checkout"
            className="checkout-btn"
          >
            Proceed to Checkout
          </Link>

        </div>

      </div>

    </main>
  );
}