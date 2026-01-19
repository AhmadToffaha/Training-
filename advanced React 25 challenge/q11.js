import React, { useEffect, useMemo, useState } from "react";

export default function App() {
  const [past, setPast] = useState([]);
  const [present, setPresent] = useState("Ahmad Toffaha");
  const [future, setFuture] = useState([]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const setText = (next) => {
    setPast((p) => [...p, present]);
    setPresent(next);
    setFuture([]);
  };

  const undo = () => {
    if (!canUndo) return;
    const prev = past[past.length - 1];
    setPast((p) => p.slice(0, -1));
    setFuture((f) => [present, ...f]);
    setPresent(prev);
  };

  const redo = () => {
    if (!canRedo) return;
    const next = future[0];
    setFuture((f) => f.slice(1));
    setPast((p) => [...p, present]);
    setPresent(next);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && (e.key === "z" || e.key === "Z")) {
        e.preventDefault();
        undo();
      }
      if (e.ctrlKey && (e.key === "y" || e.key === "Y")) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const meta = useMemo(() => ({ past: past.length, future: future.length }), [past.length, future.length]);

  return (
    <div style={{ padding: 16, maxWidth: 560 }}>
      <h3>Undo / Redo</h3>
      <textarea value={present} onChange={(e) => setText(e.target.value)} rows={5} style={{ width: "100%" }} />
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <button onClick={undo} disabled={!canUndo}>Undo (Ctrl+Z)</button>
        <button onClick={redo} disabled={!canRedo}>Redo (Ctrl+Y)</button>
      </div>
      <div style={{ marginTop: 10 }}>History: {meta.past} | Future: {meta.future}</div>
    </div>
  );
}
