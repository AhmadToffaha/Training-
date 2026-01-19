import React, { useState } from "react";

const FAQ = [
  { id: "a", q: "What is Gharsaty?", a: "A platform supporting farmers and customers." },
  { id: "b", q: "How do I order?", a: "Browse crops, add to cart, then confirm." },
  { id: "c", q: "Can I contact support?", a: "Yes, via Contact Us." },
];

export default function Q6_Accordion() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 560 }}>
      <h2>FAQ</h2>
      {FAQ.map((item) => (
        <div key={item.id} style={{ border: "1px solid #ddd", borderRadius: 10, marginBottom: 10 }}>
          <button
            onClick={() => toggle(item.id)}
            style={{
              width: "100%",
              textAlign: "left",
              padding: 12,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            {item.q}
          </button>
          {openId === item.id ? <div style={{ padding: "0 12px 12px 12px", color: "#444" }}>{item.a}</div> : null}
        </div>
      ))}
    </div>
  );
}
