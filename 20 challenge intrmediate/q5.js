import React from "react";

function AppButton({ variant = "primary", disabled = false, children, ...rest }) {
  const base = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    fontWeight: 700,
  };

  const styles =
    variant === "outline"
      ? { ...base, background: "transparent", borderColor: "#333" }
      : { ...base, background: "#111", color: "white" };

  return (
    <button disabled={disabled} style={styles} {...rest}>
      {children}
    </button>
  );
}

export default function Q5_ReusableButton() {
  return (
    <div style={{ fontFamily: "sans-serif", display: "flex", gap: 10, flexWrap: "wrap" }}>
      <AppButton onClick={() => alert("Primary")}>Primary</AppButton>
      <AppButton variant="outline" onClick={() => alert("Outline")}>Outline</AppButton>
      <AppButton disabled onClick={() => alert("Disabled")}>Disabled</AppButton>
    </div>
  );
}
