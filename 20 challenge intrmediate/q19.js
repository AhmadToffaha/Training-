import React, { useEffect, useMemo, useState } from "react";

const TOTAL_PAGES = 6;

function getPageFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const p = Number(params.get("page") || "1");
  if (!Number.isFinite(p) || p < 1) return 1;
  return Math.min(TOTAL_PAGES, p);
}

export default function Q19_PaginationUrlSync() {
  const [page, setPage] = useState(() => getPageFromUrl());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(page));
    const next = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", next);
  }, [page]);

  useEffect(() => {
    const onPop = () => setPage(getPageFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const items = useMemo(() => {
    const start = (page - 1) * 5 + 1;
    return Array.from({ length: 5 }, (_, i) => `Item ${start + i}`);
  }, [page]);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>Pagination + URL Sync</h2>
      <div style={{ marginBottom: 10 }}>page={page}</div>
      <ul>
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Prev
        </button>
        <button onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))} disabled={page === TOTAL_PAGES}>
          Next
        </button>
      </div>
    </div>
  );
}
