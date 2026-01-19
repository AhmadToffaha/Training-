import React, { useState } from "react";

export default function Toggle() {
  const [on, setOn] = useState(false);
  return (
    <div>
      <h2>{on ? "ON" : "OFF"}</h2>
      <button onClick={() => setOn((v) => !v)}>Toggle</button>
    </div>
  );
}
