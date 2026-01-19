import React, { useReducer } from "react";

const initial = { status: "idle", message: "" };

function reducer(state, action) {
  switch (action.type) {
    case "SUBMIT":
      return { status: "loading", message: "" };
    case "SUCCESS":
      return { status: "success", message: "Welcome Ahmad Toffaha" };
    case "ERROR":
      return { status: "error", message: action.message || "Login failed" };
    case "RESET":
      return initial;
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initial);

  const submit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT" });
    await new Promise((r) => setTimeout(r, 700));
    const ok = Math.random() > 0.3;
    dispatch(ok ? { type: "SUCCESS" } : { type: "ERROR", message: "Invalid credentials" });
  };

  return (
    <div style={{ padding: 16, maxWidth: 420 }}>
      <h3>Login State Machine</h3>
      {state.status !== "success" ? (
        <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
          <input placeholder="Username" defaultValue="Ahmad Toffaha" disabled={state.status === "loading"} />
          <input placeholder="Password" type="password" defaultValue="123" disabled={state.status === "loading"} />
          <button type="submit" disabled={state.status === "loading"}>{state.status === "loading" ? "Loading..." : "Login"}</button>
          {state.status === "error" && <div style={{ color: "crimson" }}>{state.message}</div>}
        </form>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ padding: 12, background: "#f6f6f6" }}>{state.message}</div>
          <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
        </div>
      )}
    </div>
  );
}
