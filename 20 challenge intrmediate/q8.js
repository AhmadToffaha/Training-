import React, { useState } from "react";

export default function Q8_DynamicFields() {
  const [skills, setSkills] = useState([{ id: crypto.randomUUID(), value: "" }]);

  const add = () => setSkills((prev) => [...prev, { id: crypto.randomUUID(), value: "" }]);
  const remove = (id) => setSkills((prev) => prev.filter((s) => s.id !== id));
  const update = (id, value) => setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, value } : s)));

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 560 }}>
      <h2>Skills</h2>
      {skills.map((s, idx) => (
        <div key={s.id} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <input
            value={s.value}
            onChange={(e) => update(s.id, e.target.value)}
            placeholder={`Skill #${idx + 1}`}
            style={{ flex: 1, padding: 8 }}
          />
          <button onClick={() => remove(s.id)} disabled={skills.length === 1}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={add}>Add Skill</button>

      <div style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 700 }}>Current Skills</div>
        <pre style={{ background: "#f6f6f6", padding: 10, borderRadius: 10 }}>
          {JSON.stringify(skills.map((s) => s.value).filter((v) => v.trim()), null, 2)}
        </pre>
      </div>
    </div>
  );
}
