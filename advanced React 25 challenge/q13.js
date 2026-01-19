import React, { Suspense, lazy } from "react";

const Dashboard = lazy(() => Promise.resolve({ default: () => <div>Dashboard</div> }));
const Settings = lazy(() => Promise.resolve({ default: () => <div>Settings</div> }));

export default function App() {
  const [page, setPage] = React.useState("dashboard");
  const Page = page === "dashboard" ? Dashboard : Settings;
  return (
    <div style={{ padding: 16 }}>
      <h3>Code Splitting with Lazy</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("settings")}>Settings</button>
      </div>
      <div style={{ marginTop: 12 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Page />
        </Suspense>
      </div>
    </div>
  );
}
