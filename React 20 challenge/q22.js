import React, { useMemo, useState } from "react";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const items = useMemo(() => {
    return Array.from({ length: 23 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));
  }, []);

  const pageSize = 5;
  const totalPages = Math.ceil(items.length / pageSize);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage]);

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  return (
    <div>
      <ul>
        {pageItems.map((i) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ul>
      <button disabled={prevDisabled} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
        Prev
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button
        disabled={nextDisabled}
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
      >
        Next
      </button>
    </div>
  );
}
