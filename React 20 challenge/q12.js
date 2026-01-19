import React, { useState } from "react";

export default function InlineEditList() {
  const [items, setItems] = useState([
    { id: 1, text: "Ahmad Toffaha" },
    { id: 2, text: "Age 20" },
    { id: 3, text: "React" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditingValue(item.text);
  };

  const save = () => {
    const v = editingValue.trim();
    if (!v) return;
    setItems((prev) => prev.map((i) => (i.id === editingId ? { ...i, text: v } : i)));
    setEditingId(null);
    setEditingValue("");
  };

  const cancel = () => {
    setEditingId(null);
    setEditingValue("");
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {editingId === item.id ? (
            <>
              <input value={editingValue} onChange={(e) => setEditingValue(e.target.value)} />
              <button onClick={save}>Save</button>
              <button onClick={cancel}>Cancel</button>
            </>
          ) : (
            <>
              <span>{item.text}</span> <button onClick={() => startEdit(item)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
