import React, { useMemo, useState } from "react";

export default function Q1_TotalPrice() {
  const [items, setItems] = useState([
    { id: 1, name: "Apple", price: 3.5, qty: 2 },
    { id: 2, name: "Milk", price: 7.25, qty: 1 },
    { id: 3, name: "Bread", price: 4.0, qty: 3 },
  ]);

  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );

  const updateQty = (id, nextQty) => {
    const q = Number(nextQty);
    if (!Number.isFinite(q) || q < 0) return;
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: q } : it)));
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>Cart</h2>
      <ul>
        {items.map((it) => (
          <li key={it.id} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
            <span style={{ width: 120 }}>{it.name}</span>
            <span style={{ width: 90 }}>{it.price.toFixed(2)} ₪</span>
            <input
              type="number"
              min={0}
              value={it.qty}
              onChange={(e) => updateQty(it.id, e.target.value)}
              style={{ width: 80 }}
            />
            <span style={{ marginLeft: "auto" }}>{(it.price * it.qty).toFixed(2)} ₪</span>
          </li>
        ))}
      </ul>
      <hr />
      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
        <span>Total</span>
        <span>{total.toFixed(2)} ₪</span>
      </div>
    </div>
  );
}
