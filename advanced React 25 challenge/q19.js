import React, { useEffect, useRef, useState } from "react";

function fakeFetch({ cursor }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = cursor ? Number(cursor) : 0;
      const items = Array.from({ length: 10 }, (_, i) => ({ id: start + i + 1, text: `Row ${start + i + 1}` }));
      const nextCursor = start + 10 >= 60 ? null : String(start + 10);
      resolve({ items, nextCursor });
    }, 600);
  });
}

export default function App() {
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const sentinelRef = useRef(null);

  const load = async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);
    const res = await fakeFetch({ cursor });
    setItems((prev) => [...prev, ...res.items]);
    setCursor(res.nextCursor);
    setHasMore(Boolean(res.nextCursor));
    setIsFetching(false);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) load();
    });
    obs.observe(node);
    return () => obs.disconnect();
  }, [cursor, hasMore, isFetching]);

  return (
    <div style={{ padding: 16, maxWidth: 520 }}>
      <h3>Infinite Scroll (Cursor)</h3>
      <ul style={{ display: "grid", gap: 8 }}>
        {items.map((it) => (
          <li key={it.id} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 10 }}>{it.text}</li>
        ))}
      </ul>
      <div ref={sentinelRef} style={{ height: 1 }} />
      <div style={{ marginTop: 10 }}>{isFetching ? "Loading..." : hasMore ? "Scroll to load" : "Done"}</div>
    </div>
  );
}
