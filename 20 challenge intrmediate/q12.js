import React, { useEffect, useState } from "react";

const KEY = "theme";

export default function Q12_DarkLightTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(KEY);
    return saved === "dark" || saved === "light" ? saved : "light";
  });

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem(KEY, theme);
  }, [theme]);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2>Theme</h2>
      <button onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
        Toggle ({theme})
      </button>
      <div style={{ marginTop: 10, color: "#555" }}>
        Body class: {theme}
      </div>
    </div>
  );
}
