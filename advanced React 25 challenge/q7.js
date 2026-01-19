import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const latest = useRef(count);
  latest.current = count;

  useEffect(() => {
    const id = setInterval(() => {
      setCount(latest.current + 1);
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h3>Prevent Stale Closure</h3>
      <div>Count: {count}</div>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
