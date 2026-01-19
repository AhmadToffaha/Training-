import React, { useEffect, useState } from "react";

function MouseTracker({ children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return children(pos);
}

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <h3>Render Props</h3>
      <MouseTracker>
        {({ x, y }) => (
          <div style={{ display: "grid", gap: 10 }}>
            <div>Coords: {x}, {y}</div>
            <div style={{ width: 200, height: 80, background: "#f6f6f6", display: "grid", placeItems: "center" }}>({x % 200}, {y % 80})</div>
          </div>
        )}
      </MouseTracker>
    </div>
  );
}
