import React, { useCallback, useMemo, useState } from "react";

export function useToggle(initial = false) {
  const [value, setValue] = useState(Boolean(initial));

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setOn = useCallback(() => setValue(true), []);
  const setOff = useCallback(() => setValue(false), []);

  return useMemo(() => [value, toggle, setOn, setOff], [value, toggle, setOn, setOff]);
}

function DemoBox({ title }) {
  const [on, toggle, setOn, setOff] = useToggle(false);
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{title}</div>
      <div style={{ marginBottom: 8 }}>State: {on ? "ON" : "OFF"}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={toggle}>Toggle</button>
        <button onClick={setOn}>Set On</button>
        <button onClick={setOff}>Set Off</button>
      </div>
    </div>
  );
}

export default function Q20_UseToggleDemo() {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 560, display: "grid", gap: 12 }}>
      <h2>useToggle Hook</h2>
      <DemoBox title="Component A" />
      <DemoBox title="Component B" />
    </div>
  );
}
