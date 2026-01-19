import React, { useEffect, useMemo, useState } from "react";

function mockSearch(query, signal) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      if (signal.aborted) return;
      const base = ["Apple", "Apricot", "Banana", "Cherry", "Grape", "Mango", "Orange", "Pear"];
      const q = query.trim().toLowerCase();
      resolve(q ? base.filter((x) => x.toLowerCase().includes(q)) : base);
    }, 500);

    signal.addEventListener("abort", () => {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

export default function Q14_FetchWithAbortController() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    mockSearch(query, controller.signal)
      .then((res) => setData(res))
      .catch((e) => {
        if (e && e.name === "AbortError") return;
        setError("Failed to load");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query]);

  const shown = useMemo(() => data, [data]);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>Abort Previous Request</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type fast..."
        style={{ width: "100%", padding: 8 }}
      />
      <div style={{ marginTop: 10 }}>{loading ? "Loading..." : error ? error : null}</div>
      <ul>
        {shown.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}
