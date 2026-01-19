import React, { useState } from "react";

export default function HideShow() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow((v) => !v)}>{show ? "Hide" : "Show"}</button>
      {show && <p>This paragraph can be hidden or shown.</p>}
    </div>
  );
}
