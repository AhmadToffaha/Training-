import React, { useMemo, useState } from "react";

function fakeCreate(text) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) reject(new Error("Network error"));
      else resolve({ id: Math.random().toString(36).slice(2), text });
    }, 600);
  });
}

export default function App() {
  const [comments, setComments] = useState(() => [{ id: "c1", text: "Hello" }]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const add = async () => {
    const text = input.trim();
    if (!text) return;
    setError("");
    const tempId = `temp_${Date.now()}`;
    setComments((prev) => [...prev, { id: tempId, text }]);
    setInput("");
    try {
      const saved = await fakeCreate(text);
      setComments((prev) => prev.map((c) => (c.id === tempId ? saved : c)));
    } catch (e) {
      setComments((prev) => prev.filter((c) => c.id !== tempId));
      setError(String(e.message || e));
    }
  };

  const list = useMemo(() => comments, [comments]);

  return (
    <div style={{ padding: 16, maxWidth: 520 }}>
      <h3>Optimistic Updates with Rollback</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Write comment" style={{ flex: 1 }} />
        <button onClick={add}>Add</button>
      </div>
      {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}
      <ul style={{ marginTop: 12 }}>
        {list.map((c) => (
          <li key={c.id} style={{ opacity: c.id.startsWith("temp_") ? 0.6 : 1 }}>{c.text}</li>
        ))}
      </ul>
    </div>
  );
}
