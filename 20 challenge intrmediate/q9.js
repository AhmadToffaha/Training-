import React, { useMemo, useState } from "react";

function strengthLabel(score) {
  if (score <= 1) return "Weak";
  if (score === 2) return "Medium";
  return "Strong";
}

export default function Q9_PasswordStrength() {
  const [pwd, setPwd] = useState("");

  const score = useMemo(() => {
    let s = 0;
    if (pwd.length >= 8) s += 1;
    if (/[0-9]/.test(pwd)) s += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) s += 1;
    return s;
  }, [pwd]);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>Password Strength</h2>
      <input
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
        placeholder="Enter password"
        style={{ width: "100%", padding: 8 }}
      />
      <div style={{ marginTop: 10 }}>
        <div>Strength: {strengthLabel(score)}</div>
        <div style={{ height: 8, background: "#eee", borderRadius: 999, overflow: "hidden", marginTop: 6 }}>
          <div style={{ width: `${(score / 3) * 100}%`, height: "100%", background: "#111" }} />
        </div>
        <div style={{ marginTop: 8, color: "#555" }}>
          Rules: length ≥ 8, contains a number, contains a symbol
        </div>
      </div>
    </div>
  );
}
