"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cart,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const handleOrder = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    alert(
      "Order placed successfully!"
    );

    clearCart();

    router.replace("/order-success");
  };

  if (cart.length === 0) {
    return (
      <main className="empty-cart">
        <h1>Your cart is empty</h1>
      </main>
    );
  }

  return (
    <main className="checkout-page">

      <div className="checkout-container">

        <div className="checkout-product">

          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              className="checkout-item"
              key={item.id}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹
                {(
                  item.price *
                  item.quantity
                ).toLocaleString("en-IN")}
              </span>
            </div>
          ))}

          <hr />

          <h2>
            Total: ₹
            {total.toLocaleString("en-IN")}
          </h2>

        </div>

        <div className="checkout-form-card">

          <h2>Delivery Information</h2>

          <form onSubmit={handleOrder}>

            <label>Full Name</label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

            <label>Phone Number</label>

            <input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              required
            />

            <label>Address</label>

            <textarea
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              required
            />

            <label>City</label>

            <input
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              required
            />

            <label>Pincode</label>

            <input
              value={pincode}
              onChange={(e) =>
                setPincode(e.target.value)
              }
              required
            />

            <button
              className="place-order-btn"
              type="submit"
            >
              Place Order
            </button>

          </form>

        </div>

      </div>

    </main>
  );
}