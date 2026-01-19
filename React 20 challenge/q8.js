import React, { useMemo, useState } from "react";

export default function AvailableFilter() {
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const items = [
    { id: 1, name: "Item A", available: true },
    { id: 2, name: "Item B", available: false },
    { id: 3, name: "Item C", available: true },
  ];

  const filtered = useMemo(() => {
    return onlyAvailable ? items.filter((i) => i.available) : items;
  }, [onlyAvailable]);

  return (
    <div>
      <button onClick={() => setOnlyAvailable((v) => !v)}>Available Show</button>
      <ul>
        {filtered.map((i) => (
          <li key={i.id}>
            {i.name} {i.available ? "(Available)" : "(Not Available)"}
          </li>
        ))}
      </ul>
    </div>
  );
}
