import React, { memo, useCallback, useMemo, useState } from "react";

const Row = memo(function Row({ item, onInc }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
      <div style={{ width: 120 }}>{item.name}</div>
      <div style={{ width: 60 }}>{item.count}</div>
      <button onClick={() => onInc(item.id)}>+1</button>
    </div>
  );
});

export default function Q23_MemoizationReactMemo() {
  const [items, setItems] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}`, count: 0 }))
  );

  const inc = useCallback((id) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, count: x.count + 1 } : x)));
  }, []);

  const total = useMemo(() => items.reduce((s, x) => s + x.count, 0), [items]);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>React.memo + useCallback</h2>
      <div style={{ marginBottom: 10 }}>Total clicks: {total}</div>
      {items.map((it) => (
        <Row key={it.id} item={it} onInc={inc} />
      ))}
    </div>
  );
}
