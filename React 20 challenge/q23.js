import React, { useMemo, useState } from "react";

export default function Sorting() {
  const [sortBy, setSortBy] = useState("name_asc");

  const items = [
    { id: 1, name: "Banana", price: 7 },
    { id: 2, name: "Apple", price: 5 },
    { id: 3, name: "Orange", price: 6 },
  ];

  const sorted = useMemo(() => {
    const arr = [...items];

    if (sortBy === "name_asc") arr.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "name_desc") arr.sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === "price_asc") arr.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") arr.sort((a, b) => b.price - a.price);

    return arr;
  }, [sortBy]);

  return (
    <div>
      <button onClick={() => setSortBy((v) => (v === "name_asc" ? "name_desc" : "name_asc"))}>
        Sort Name
      </button>
      <button onClick={() => setSortBy((v) => (v === "price_asc" ? "price_desc" : "price_asc"))}>
        Sort Price
      </button>

      <ul>
        {sorted.map((i) => (
          <li key={i.id}>
            {i.name} - {i.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
