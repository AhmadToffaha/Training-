import React, { useEffect, useRef, useState } from "react";

export function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options);
    obs.observe(node);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

export default function App() {
  const { ref, inView } = useInView({ threshold: 0.6 });
  return (
    <div style={{ padding: 16 }}>
      <h3>Intersection Observer Hook</h3>
      <div style={{ height: 400, background: "#f6f6f6", marginBottom: 12 }}>Scroll down</div>
      <div ref={ref} style={{ height: 120, background: inView ? "#d8f5d8" : "#ffd8d8", display: "grid", placeItems: "center" }}>
        {inView ? "In View" : "Out of View"}
      </div>
      <div style={{ height: 500 }} />
    </div>
  );
}
