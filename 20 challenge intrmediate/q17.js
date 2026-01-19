import React, { useEffect, useRef, useState } from "react";

export default function Q17_KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      const isCtrlK = (e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K");
      if (isCtrlK) {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => {
          if (inputRef.current) inputRef.current.focus();
        }, 0);
      }
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>Keyboard Shortcut</h2>
      <div style={{ color: "#555" }}>Press Ctrl+K (or Cmd+K) to open search</div>
      {open ? (
        <div style={{ marginTop: 12, border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
          <input ref={inputRef} placeholder="Search..." style={{ width: "100%", padding: 8 }} />
          <button onClick={() => setOpen(false)} style={{ marginTop: 10 }}>
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
}
