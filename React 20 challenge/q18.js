import React, { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("Overview");

  const content = {
    Overview: "Overview content",
    Lessons: "Lessons content",
    Reviews: "Reviews content",
  };

  return (
    <div>
      <div>
        {Object.keys(content).map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} disabled={activeTab === t}>
            {t}
          </button>
        ))}
      </div>
      <div>
        <h3>{activeTab}</h3>
        <p>{content[activeTab]}</p>
      </div>
    </div>
  );
}
