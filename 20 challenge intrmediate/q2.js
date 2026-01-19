import React, { useRef, useState } from "react";

export default function Q2_ControlledVsUncontrolled() {
  const [controlled, setControlled] = useState("");
  const uncontrolledRef = useRef(null);
  const [read, setRead] = useState({ controlled: "", uncontrolled: "" });

  const readValues = () => {
    const u = uncontrolledRef.current ? uncontrolledRef.current.value : "";
    setRead({ controlled, uncontrolled: u });
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>Controlled vs Uncontrolled</h2>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 6 }}>Controlled</label>
        <input value={controlled} onChange={(e) => setControlled(e.target.value)} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 6 }}>Uncontrolled</label>
        <input ref={uncontrolledRef} defaultValue="" />
      </div>

      <button onClick={readValues}>Read values</button>

      <div style={{ marginTop: 14 }}>
        <div>Controlled: {read.controlled || "(empty)"}</div>
        <div>Uncontrolled: {read.uncontrolled || "(empty)"}</div>
      </div>
    </div>
  );
}
