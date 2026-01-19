import React, { useState } from "react";

export default function Q4_InfiniteCounterWithStep() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const onStepChange = (v) => {
    const n = Number(v);
    if (!Number.isFinite(n) || n <= 0) {
      setError("Step must be a positive number");
      return;
    }
    setError("");
    setStep(n);
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>Counter with Step</h2>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <div style={{ minWidth: 80, textAlign: "center", fontWeight: 700 }}>{count}</div>
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Step: </label>
        <input
          type="number"
          value={step}
          onChange={(e) => onStepChange(e.target.value)}
          style={{ width: 120 }}
        />
      </div>
      {error ? <div style={{ marginTop: 8, color: "crimson" }}>{error}</div> : null}
    </div>
  );
}
