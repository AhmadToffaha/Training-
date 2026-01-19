import React from "react";

export default function ProductList() {
  const products = [
    { id: 1, name: "Apples" },
    { id: 2, name: "Tomatoes" },
    { id: 3, name: "Olive Oil" },
  ];

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
