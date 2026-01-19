import React, { useEffect, useMemo, useState } from "react";

const DATA = [
  "Apple",
  "Apricot",
  "Banana",
  "Blueberry",
  "Cherry",
  "Grape",
  "Kiwi",
  "Mango",
  "Orange",
  "Peach",
  "Pear",
  "Pineapple",
  "Strawberry",
  "Watermelon",
];

export default function Q3_DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 400);
    return () => clearTimeout(id);
  }, [query]);

  const results = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return DATA;
    return DATA.filter((x) => x.toLowerCase().includes(q));
  }, [debounced]);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>Debounced Search (400ms)</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
        style={{ width: "100%", padding: 8 }}
      />
      <div style={{ marginTop: 10, color: "#555" }}>Searching for: {debounced || "(empty)"}</div>
      <ul style={{ marginTop: 10 }}>
        {results.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
