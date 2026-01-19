import React, { useEffect, useState } from "react";

export function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function App() {
  const [q, setQ] = useState("");
  const debounced = useDebounce(q, 400);
  return (
    <div style={{ padding: 16 }}>
      <h3>useDebounce</h3>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type..." />
      <div style={{ marginTop: 10 }}>Debounced: {debounced}</div>
    </div>
  );
}
