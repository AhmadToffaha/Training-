import React, { useState } from "react";

export default function Q11_CopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const text = "Ahmad Toffaha";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (e) {
      setCopied(false);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>Copy to Clipboard</h2>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <input value={text} readOnly style={{ flex: 1, padding: 8 }} />
        <button onClick={copy}>Copy</button>
      </div>
      {copied ? <div style={{ marginTop: 10, color: "green" }}>Copied!</div> : null}
    </div>
  );
}
