import React, { useMemo, useState } from "react";

function moveCard(board, fromColId, toColId, cardId, toIndex) {
  const fromCol = board.columns.find((c) => c.id === fromColId);
  const toCol = board.columns.find((c) => c.id === toColId);
  const card = fromCol.cards.find((c) => c.id === cardId);
  const nextFromCards = fromCol.cards.filter((c) => c.id !== cardId);
  const nextToCards = [...toCol.cards];
  const idx = Math.max(0, Math.min(toIndex, nextToCards.length));
  nextToCards.splice(idx, 0, card);
  return {
    ...board,
    columns: board.columns.map((c) => {
      if (c.id === fromColId) return { ...c, cards: nextFromCards };
      if (c.id === toColId) return { ...c, cards: nextToCards };
      return c;
    }),
  };
}

export default function App() {
  const [board, setBoard] = useState(() => ({
    columns: [
      { id: "todo", title: "Todo", cards: [{ id: "c1", text: "Task A" }, { id: "c2", text: "Task B" }] },
      { id: "doing", title: "Doing", cards: [{ id: "c3", text: "Task C" }] },
      { id: "done", title: "Done", cards: [{ id: "c4", text: "Task D" }] },
    ],
  }));

  const [drag, setDrag] = useState(null);

  const onDragStart = (fromColId, cardId) => setDrag({ fromColId, cardId });

  const onDrop = (toColId, toIndex) => {
    if (!drag) return;
    setBoard((b) => moveCard(b, drag.fromColId, toColId, drag.cardId, toIndex));
    setDrag(null);
  };

  const cols = useMemo(() => board.columns, [board]);

  return (
    <div style={{ padding: 16 }}>
      <h3>Drag & Drop Board</h3>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        {cols.map((col) => (
          <div key={col.id} style={{ width: 260, background: "#f6f6f6", borderRadius: 12, padding: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 10 }}>{col.title}</div>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(col.id, col.cards.length)}
              style={{ display: "grid", gap: 10, minHeight: 40 }}
            >
              {col.cards.map((card, idx) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => onDragStart(col.id, card.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDrop(col.id, idx)}
                  style={{ background: "white", borderRadius: 10, padding: 10, border: "1px solid #ddd" }}
                >
                  {card.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
