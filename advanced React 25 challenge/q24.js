import React, { createContext, useContext, useMemo } from "react";

const FeatureContext = createContext(null);

export function FeatureProvider({ flags, children }) {
  const value = useMemo(() => flags, [flags]);
  return <FeatureContext.Provider value={value}>{children}</FeatureContext.Provider>;
}

export function useFeature(key) {
  const flags = useContext(FeatureContext);
  if (!flags) throw new Error("Missing FeatureProvider");
  return Boolean(flags[key]);
}

function Dashboard() {
  const newUI = useFeature("newUI");
  const pro = useFeature("proAnalytics");
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
      <div style={{ fontWeight: 700 }}>Dashboard</div>
      <div>New UI: {newUI ? "ON" : "OFF"}</div>
      <div>Pro Analytics: {pro ? "ON" : "OFF"}</div>
    </div>
  );
}

export default function App() {
  const plan = "pro";
  const flags = useMemo(
    () => ({
      newUI: true,
      proAnalytics: plan === "pro",
    }),
    [plan]
  );

  return (
    <div style={{ padding: 16, maxWidth: 520 }}>
      <h3>Multi-tenant Feature Flags</h3>
      <FeatureProvider flags={flags}>
        <Dashboard />
      </FeatureProvider>
      <div style={{ marginTop: 10 }}>User: Ahmad Toffaha (20)</div>
    </div>
  );
}
