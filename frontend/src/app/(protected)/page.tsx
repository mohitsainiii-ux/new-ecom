"use client";

import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    description:
      "High-quality wireless headphones with clear sound and comfortable design.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2999,
    description:
      "Modern smartwatch with fitness tracking, notifications and stylish design.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 2499,
    description:
      "Comfortable running shoes suitable for daily walking and workouts.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 4,
    name: "Laptop",
    price: 54999,
    description:
      "Powerful laptop for work, development, entertainment and everyday use.",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
  },
  {
    id: 5,
    name: "Smartphone",
    price: 24999,
    description:
      "Modern smartphone with a powerful processor and high-quality camera.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
  },
  {
    id: 6,
    name: "Backpack",
    price: 1299,
    description:
      "Durable and spacious backpack for college, office and travel.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
  },
];

export default function HomePage() {
  return (
    <main className="home-page">

      <section className="hero-section">

        <div>
          <span className="hero-badge">
            Welcome to E-Shop
          </span>

          <h1>
            Shop Everything
            <br />
            You Need
          </h1>

          <p>
            Discover quality products at
            amazing prices.
          </p>
        </div>

      </section>

      <section className="products-section">

        <div className="section-heading">
          <h2>Our Products</h2>

          <p>
            Choose your favourite product
          </p>
        </div>

        <div className="products-grid">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </section>

    </main>
  );
}