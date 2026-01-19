import React, { useState } from "react";

export default function DeleteFromList() {
  const [items, setItems] = useState([
    { id: 1, text: "First" },
    { id: 2, text: "Second" },
    { id: 3, text: "Third" },
  ]);

  const remove = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <ul>
      {items.map((i) => (
        <li key={i.id}>
          {i.text} <button onClick={() => remove(i.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
