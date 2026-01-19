import React, { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      try {
        return JSON.parse(raw);
      } catch {
        return initialValue;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default function ThemeSaver() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <div>
      <p>Theme: {theme}</p>
      <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>Toggle Theme</button>
    </div>
  );
}
