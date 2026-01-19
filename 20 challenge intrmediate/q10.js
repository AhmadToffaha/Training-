import React, { useEffect, useRef, useState } from "react";

export default function Q10_ToastNotifications() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const addToast = (message) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message }]);
    const t = setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
      timers.current.delete(id);
    }, 3000);
    timers.current.set(id, t);
  };

  const remove = (id) => {
    const t = timers.current.get(id);
    if (t) clearTimeout(t);
    timers.current.delete(id);
    setToasts((prev) => prev.filter((x) => x.id !== id));
  };

  useEffect(() => {
    return () => {
      for (const t of timers.current.values()) clearTimeout(t);
      timers.current.clear();
    };
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2>Toasts</h2>
      <button onClick={() => addToast("Hello from Toast")}>Show Toast</button>
      <button onClick={() => addToast("Saved successfully") } style={{ marginLeft: 8 }}>Show Another</button>

      <div style={{ position: "fixed", top: 16, right: 16, display: "grid", gap: 10, zIndex: 9999 }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              background: "#111",
              color: "white",
              padding: "10px 12px",
              borderRadius: 12,
              minWidth: 220,
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
              alignItems: "center",
            }}
          >
            <span>{t.message}</span>
            <button
              onClick={() => remove(t.id)}
              style={{ background: "transparent", color: "white", border: "none", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
