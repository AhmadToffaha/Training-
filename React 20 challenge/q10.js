import React, { useState } from "react";

export default function AddToList() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

  const add = () => {
    const v = text.trim();
    if (!v) return;
    setItems((prev) => [...prev, { id: Date.now(), text: v }]);
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New item" />
      <button onClick={add}>Add</button>
      <ul>
        {items.map((i) => (
          <li key={i.id}>{i.text}</li>
        ))}
      </ul>
    </div>
  );
}
