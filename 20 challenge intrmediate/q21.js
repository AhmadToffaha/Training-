import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

function Modal({ open, onClose, children }) {
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  useEffect(() => {
    const el = elRef.current;
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "grid",
        placeItems: "center",
        zIndex: 9999,
      }}
    >
      <div style={{ background: "white", borderRadius: 14, padding: 14, minWidth: 320 }}>
        {children}
      </div>
    </div>,
    elRef.current
  );
}

export default function Q21_PortalModal() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2>Portal Modal</h2>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>Hello</div>
        <div style={{ marginBottom: 12 }}>This modal is rendered using a portal.</div>
        <button onClick={() => setOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}
