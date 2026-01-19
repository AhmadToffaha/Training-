import React, { useEffect, useState } from "react";

function SkeletonRow() {
  return (
    <div
      style={{
        height: 16,
        borderRadius: 8,
        background: "#e8e8e8",
        marginBottom: 10,
      }}
    />
  );
}

export default function Q15_SkeletonLoader() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const id = setTimeout(() => {
      setItems(["Order #1201", "Order #1202", "Order #1203", "Order #1204"]);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(id);
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>Skeleton Loader</h2>
      {loading ? (
        <div>
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      ) : (
        <ul>
          {items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
