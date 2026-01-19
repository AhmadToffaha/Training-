import React, { useMemo, useState } from "react";

export default function UseMemoFilter() {
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    return Array.from({ length: 5000 }, (_, i) => ({ id: i + 1, name: `Product ${i + 1}` }));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.name.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
      <p>{filtered.length}</p>
      <ul>
        {filtered.slice(0, 20).map((i) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ul>
    </div>
  );
}
