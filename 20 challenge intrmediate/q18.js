import React, { useState } from "react";

function mockSave(profile) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ok = Math.random() > 0.25;
      if (ok) resolve(profile);
      else reject(new Error("Failed"));
    }, 700);
  });
}

export default function Q18_EditableProfileOptimistic() {
  const [profile, setProfile] = useState({ name: "Ahmad Toffaha", age: 20 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const save = async () => {
    const prev = profile;
    setSaving(true);
    setError(null);
    const optimistic = { ...profile };
    setProfile(optimistic);
    try {
      const saved = await mockSave(optimistic);
      setProfile(saved);
    } catch (e) {
      setProfile(prev);
      setError("Save failed, rolled back");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>Editable Profile</h2>
      <div style={{ display: "grid", gap: 10 }}>
        <input value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
        <input
          type="number"
          value={profile.age}
          onChange={(e) => setProfile((p) => ({ ...p, age: Number(e.target.value) }))}
        />
        <button onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        {error ? <div style={{ color: "crimson" }}>{error}</div> : null}
      </div>
    </div>
  );
}
