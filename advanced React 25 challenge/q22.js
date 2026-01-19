import React, { useEffect, useMemo, useState } from "react";

const queryCache = new Map();

function getQuery(key) {
  if (!queryCache.has(key)) queryCache.set(key, { data: null, error: null, status: "idle", updatedAt: 0, subscribers: new Set(), promise: null });
  return queryCache.get(key);
}

export function useQuery(key, fetcher, { staleTime = 0 } = {}) {
  const [, force] = useState(0);
  const q = useMemo(() => getQuery(key), [key]);

  useEffect(() => {
    const tick = () => force((n) => n + 1);
    q.subscribers.add(tick);
    return () => q.subscribers.delete(tick);
  }, [q]);

  const isStale = Date.now() - q.updatedAt > staleTime;

  const run = () => {
    if (q.status === "loading") return q.promise;
    q.status = "loading";
    q.error = null;
    q.promise = Promise.resolve()
      .then(() => fetcher())
      .then((data) => {
        q.data = data;
        q.status = "success";
        q.updatedAt = Date.now();
        q.subscribers.forEach((fn) => fn());
      })
      .catch((err) => {
        q.error = err;
        q.status = "error";
        q.subscribers.forEach((fn) => fn());
      });
    q.subscribers.forEach((fn) => fn());
    return q.promise;
  };

  useEffect(() => {
    if (q.status === "idle" || isStale) run();
  }, [key]);

  return { data: q.data, error: q.error, status: q.status, refetch: run };
}

function fetchUser() {
  return new Promise((resolve) => setTimeout(() => resolve({ name: "Ahmad Toffaha", age: 20, ts: Date.now() }), 600));
}

function Panel() {
  const q = useQuery("user", fetchUser, { staleTime: 5000 });
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
      <div style={{ fontWeight: 700 }}>Panel</div>
      {q.status === "loading" && <div>Loading...</div>}
      {q.status === "error" && <div style={{ color: "crimson" }}>{String(q.error?.message || q.error)}</div>}
      {q.status === "success" && <pre style={{ background: "#f6f6f6", padding: 10 }}>{JSON.stringify(q.data, null, 2)}</pre>}
      <button onClick={() => q.refetch()}>Refetch</button>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: 16, display: "grid", gap: 12, maxWidth: 560 }}>
      <h3>Mini Query Cache</h3>
      <Panel />
      <Panel />
    </div>
  );
}
