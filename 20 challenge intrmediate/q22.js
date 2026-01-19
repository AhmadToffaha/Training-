import React, { createContext, useContext, useMemo, useState } from "react";

const TabsCtx = createContext(null);

function Tabs({ defaultValue, children }) {
  const [value, setValue] = useState(defaultValue);
  const api = useMemo(() => ({ value, setValue }), [value]);
  return <TabsCtx.Provider value={api}>{children}</TabsCtx.Provider>;
}

function TabsList({ children }) {
  return <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>{children}</div>;
}

function TabsTrigger({ value, children }) {
  const ctx = useContext(TabsCtx);
  const active = ctx.value === value;
  return (
    <button
      onClick={() => ctx.setValue(value)}
      style={{
        padding: "8px 10px",
        borderRadius: 10,
        border: "1px solid #ddd",
        background: active ? "#111" : "white",
        color: active ? "white" : "#111",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function TabsPanel({ value, children }) {
  const ctx = useContext(TabsCtx);
  if (ctx.value !== value) return null;
  return <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>{children}</div>;
}

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Panel = TabsPanel;

export default function Q22_CompoundTabs() {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 560 }}>
      <h2>Compound Tabs</h2>
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="lessons">Lessons</Tabs.Trigger>
          <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Panel value="overview">Overview content</Tabs.Panel>
        <Tabs.Panel value="lessons">Lessons content</Tabs.Panel>
        <Tabs.Panel value="reviews">Reviews content</Tabs.Panel>
      </Tabs>
    </div>
  );
}
