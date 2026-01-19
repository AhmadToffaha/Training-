import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = document.createElement("div");
    el.style.position = "fixed";
    el.style.top = "16px";
    el.style.right = "16px";
    el.style.zIndex = "9999";
    el.style.display = "grid";
    el.style.gap = "10px";
    document.body.appendChild(el);
    containerRef.current = el;
    return () => {
      document.body.removeChild(el);
      containerRef.current = null;
    };
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, { duration = 2500 } = {}) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message }]);
    if (duration > 0) setTimeout(() => dismiss(id), duration);
    return id;
  }, [dismiss]);

  const api = useMemo(() => ({ addToast, dismiss }), [addToast, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {containerRef.current
        ? createPortal(
            toasts.map((t) => (
              <div key={t.id} style={{ background: "#222", color: "white", padding: "10px 12px", borderRadius: 10, minWidth: 220 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <span>{t.message}</span>
                  <button onClick={() => dismiss(t.id)} style={{ background: "transparent", border: "0", color: "white", cursor: "pointer" }}>✕</button>
                </div>
              </div>
            )),
            containerRef.current
          )
        : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function Demo() {
  const { addToast } = useToast();
  return (
    <div style={{ padding: 16 }}>
      <h3>Toast System</h3>
      <button onClick={() => addToast("Hello Ahmad Toffaha")}>Show Toast</button>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  );
}
