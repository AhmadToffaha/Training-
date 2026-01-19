import React, { useMemo, useState } from "react";

export default function SearchList() {
  const [query, setQuery] = useState("");

  const items = [
    { id: 1, name: "Ahmad Toffaha" },
    { id: 2, name: "Mona" },
    { id: 3, name: "Ahmad Ali" },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.name.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name" />
      <ul>
        {filtered.map((i) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ul>
    </div>
  );
}
