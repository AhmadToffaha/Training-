import React, { useMemo, useState } from "react";

const ITEMS = [
  { id: 1, name: "Tomato", price: 8, category: "Vegetables" },
  { id: 2, name: "Cucumber", price: 6, category: "Vegetables" },
  { id: 3, name: "Olive Oil", price: 35, category: "Grocery" },
  { id: 4, name: "Rice", price: 18, category: "Grocery" },
  { id: 5, name: "Apple", price: 10, category: "Fruits" },
];

export default function Q16_SortFilterSearch() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("name-asc");

  const result = useMemo(() => {
    let arr = ITEMS;
    if (category !== "All") arr = arr.filter((x) => x.category === category);
    const q = query.trim().toLowerCase();
    if (q) arr = arr.filter((x) => x.name.toLowerCase().includes(q));

    const sorted = [...arr];
    sorted.sort((a, b) => {
      if (sortKey === "name-asc") return a.name.localeCompare(b.name);
      if (sortKey === "name-desc") return b.name.localeCompare(a.name);
      if (sortKey === "price-asc") return a.price - b.price;
      return b.price - a.price;
    });
    return sorted;
  }, [category, query, sortKey]);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 560 }}>
      <h2>Sort + Filter + Search</h2>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Grocery</option>
        </select>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="name-asc">Name ↑</option>
          <option value="name-desc">Name ↓</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>
      </div>
      <ul>
        {result.map((x) => (
          <li key={x.id}>
            {x.name} — {x.category} — {x.price} ₪
          </li>
        ))}
      </ul>
    </div>
  );
}
