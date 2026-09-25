"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-content">

        <h3>{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-price">
          ₹{product.price.toLocaleString("en-IN")}
        </div>

        <div className="product-actions">

          <button
            className="cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <Link
            href={`/buy/${product.id}`}
            className="buy-btn"
          >
            Buy Now
          </Link>

        </div>

      </div>
    </div>
  );
}