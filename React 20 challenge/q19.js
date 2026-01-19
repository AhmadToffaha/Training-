import React, { useState } from "react";

export default function ModalExample() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      {open && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ background: "white", padding: 16, minWidth: 280 }}>
            <h3>Modal</h3>
            <p>Hello Ahmad Toffaha</p>
            <button onClick={close}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
