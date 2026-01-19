import React, { useEffect, useMemo, useState } from "react";

const cache = new Map();

function getEntry(key, fetcher) {
  if (cache.has(key)) return cache.get(key);
  const entry = { status: "loading", data: null, error: null, promise: null, subscribers: new Set() };
  entry.promise = Promise.resolve()
    .then(() => fetcher())
    .then((data) => {
      entry.status = "ready";
      entry.data = data;
      entry.error = null;
      entry.subscribers.forEach((fn) => fn());
    })
    .catch((err) => {
      entry.status = "error";
      entry.error = err;
      entry.subscribers.forEach((fn) => fn());
    });
  cache.set(key, entry);
  return entry;
}

export function useResource(key, fetcher) {
  const [, force] = useState(0);
  const entry = useMemo(() => getEntry(key, fetcher), [key, fetcher]);

  useEffect(() => {
    const tick = () => force((n) => n + 1);
    entry.subscribers.add(tick);
    return () => entry.subscribers.delete(tick);
  }, [entry]);

  return {
    status: entry.status,
    data: entry.data,
    error: entry.error,
    reload() {
      cache.delete(key);
      force((n) => n + 1);
    },
  };
}

export default function App() {
  const resource = useResource("demo", async () => {
    await new Promise((r) => setTimeout(r, 700));
    if (Math.random() < 0.25) throw new Error("Fetch failed");
    return { user: "Ahmad Toffaha", age: 20, ts: Date.now() };
  });

  return (
    <div style={{ padding: 16 }}>
      <h3>Suspense-like Loader (Manual)</h3>
      {resource.status === "loading" && <div>Loading...</div>}
      {resource.status === "error" && (
        <div style={{ color: "crimson" }}>
          {String(resource.error?.message || resource.error)}
        </div>
      )}
      {resource.status === "ready" && (
        <pre style={{ background: "#f6f6f6", padding: 12 }}>{JSON.stringify(resource.data, null, 2)}</pre>
      )}
      <button onClick={() => resource.reload()} style={{ marginTop: 10 }}>Reload</button>
    </div>
  );
}
