import React, { useMemo, useState } from "react";

function reorder(list, from, to) {
  const next = [...list];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

export default function Q24_DragAndDropList() {
  const [items, setItems] = useState(["Ahmad Toffaha", "Task A", "Task B", "Task C", "Task D"]);
  const [dragIndex, setDragIndex] = useState(null);

  const rows = useMemo(() => items, [items]);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>Drag & Drop List</h2>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
        {rows.map((text, index) => (
          <li
            key={text + index}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIndex === null || dragIndex === index) return;
              setItems((prev) => reorder(prev, dragIndex, index));
              setDragIndex(null);
            }}
            style={{
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 12,
              background: "white",
              cursor: "grab",
            }}
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
