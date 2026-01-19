import React, { memo, useMemo, useState } from "react";

function slowFormat(n) {
  let x = 0;
  for (let i = 0; i < 8000; i++) x += Math.sqrt(i + n);
  return `${n} (${x.toFixed(0)})`;
}

const Row = memo(function Row({ n }) {
  const label = useMemo(() => slowFormat(n), [n]);
  return <div style={{ padding: "6px 10px", borderBottom: "1px solid #eee" }}>{label}</div>;
});

function LaggyList({ size }) {
  const items = useMemo(() => Array.from({ length: size }, (_, i) => i + 1), [size]);
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, overflow: "auto", height: 260 }}>
      {items.map((n) => (
        <Row key={n} n={n} />
      ))}
    </div>
  );
}

export default function App() {
  const [size, setSize] = useState(400);
  return (
    <div style={{ padding: 16, maxWidth: 560 }}>
      <h3>Performance Profiling Task</h3>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span>Rows</span>
        <input type="range" min={50} max={800} value={size} onChange={(e) => setSize(Number(e.target.value))} />
        <span>{size}</span>
      </div>
      <div style={{ marginTop: 12 }}>
        <LaggyList size={size} />
      </div>
      <div style={{ marginTop: 10 }}>Use Profiler to compare before/after, then apply memoization and virtualization if needed.</div>
    </div>
  );
}
