import React, { memo, useCallback, useMemo, useState } from "react";

const Chart = memo(function Chart({ data, onPointClick }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Chart</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {data.map((v, i) => (
          <button key={i} onClick={() => onPointClick(v)} style={{ padding: "6px 10px" }}>{v}</button>
        ))}
      </div>
    </div>
  );
});

const Stats = memo(function Stats({ total, user }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
      <div style={{ fontWeight: 700 }}>Stats</div>
      <div>Total: {total}</div>
      <div>User: {user}</div>
    </div>
  );
});

export default function App() {
  const [tick, setTick] = useState(0);
  const [selected, setSelected] = useState(null);

  const data = useMemo(() => Array.from({ length: 40 }, (_, i) => (i + 1) * 2), []);
  const total = useMemo(() => data.reduce((a, b) => a + b, 0), [data]);

  const onPointClick = useCallback((v) => setSelected(v), []);

  return (
    <div style={{ padding: 16 }}>
      <h3>Complex Memoization Strategy</h3>
      <button onClick={() => setTick((t) => t + 1)}>Unrelated Update: {tick}</button>
      <div style={{ display: "grid", gap: 12, marginTop: 12, maxWidth: 520 }}>
        <Stats total={total} user="Ahmad Toffaha" />
        <Chart data={data} onPointClick={onPointClick} />
        <div>Selected: {selected ?? "-"}</div>
      </div>
    </div>
  );
}
