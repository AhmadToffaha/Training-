import React, { useMemo, useRef, useState } from "react";

function VirtualizedList({ items, itemHeight = 36, height = 360, overscan = 6, renderItem }) {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;

  const { startIndex, endIndex } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const visibleCount = Math.ceil(height / itemHeight) + overscan * 2;
    const end = Math.min(items.length - 1, start + visibleCount - 1);
    return { startIndex: start, endIndex: end };
  }, [scrollTop, itemHeight, overscan, height, items.length]);

  const visible = items.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * itemHeight;

  return (
    <div
      ref={containerRef}
      style={{ height, overflow: "auto", border: "1px solid #ddd" }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visible.map((item, i) => (
            <div key={startIndex + i} style={{ height: itemHeight, display: "flex", alignItems: "center", padding: "0 12px" }}>
              {renderItem(item, startIndex + i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const items = useMemo(() => Array.from({ length: 10000 }, (_, i) => `Item #${i + 1}`), []);
  return (
    <div style={{ padding: 16 }}>
      <h3>Virtualized List (10,000)</h3>
      <VirtualizedList
        items={items}
        renderItem={(item) => <span>{item}</span>}
      />
    </div>
  );
}
