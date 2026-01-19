import React, { useState } from "react";

export default function SelectLevel() {
  const [level, setLevel] = useState("Beginner");
  return (
    <div>
      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      <p>Selected: {level}</p>
    </div>
  );
}
