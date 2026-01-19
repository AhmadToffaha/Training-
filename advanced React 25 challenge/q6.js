import React, { useEffect, useRef, useState } from "react";

export function useEventListener(target, event, handler, options) {
  const saved = useRef(handler);
  useEffect(() => {
    saved.current = handler;
  }, [handler]);

  useEffect(() => {
    const el = typeof target === "function" ? target() : target;
    const node = el && "current" in el ? el.current : el;
    if (!node || !node.addEventListener) return;
    const listener = (e) => saved.current(e);
    node.addEventListener(event, listener, options);
    return () => node.removeEventListener(event, listener, options);
  }, [target, event, options]);
}

export default function App() {
  const [count, setCount] = useState(0);
  useEventListener(() => window, "keydown", (e) => {
    if (e.key === " ") setCount((c) => c + 1);
  });
  return (
    <div style={{ padding: 16 }}>
      <h3>useEventListener</h3>
      <div>Press Space: {count}</div>
    </div>
  );
}
