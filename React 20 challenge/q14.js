import React, { useState } from "react";

export default function CharCounter() {
  const [value, setValue] = useState("");
  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <p>{value.length}</p>
    </div>
  );
}
