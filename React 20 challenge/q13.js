import React, { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Buy seeds", done: false },
    { id: 2, text: "Call delivery", done: true },
  ]);

  const toggle = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id} style={{ textDecoration: t.done ? "line-through" : "none" }}>
          <label>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} /> {t.text}
          </label>
        </li>
      ))}
    </ul>
  );
}
