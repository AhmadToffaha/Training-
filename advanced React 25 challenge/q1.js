import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const RouterContext = createContext(null);

const getPath = () => window.location.pathname + window.location.search + window.location.hash;

export function Router({ children }) {
  const [path, setPath] = useState(() => getPath());

  useEffect(() => {
    const onPopState = () => setPath(getPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const url = typeof to === "string" ? to : String(to);
    if (replace) window.history.replaceState({}, "", url);
    else window.history.pushState({}, "", url);
    setPath(getPath());
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used within <Router>");
  return ctx;
}

export function Link({ to, replace = false, onClick, children, ...rest }) {
  const { navigate } = useRouter();
  return (
    <a
      href={to}
      onClick={(e) => {
        if (onClick) onClick(e);
        if (e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to, { replace });
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Route({ path: routePath, component: Component, render, children, exact = true }) {
  const { path } = useRouter();
  const current = path.split("?")[0].split("#")[0];
  const match = exact ? current === routePath : current.startsWith(routePath);
  if (!match) return null;
  if (Component) return <Component />;
  if (render) return render();
  return children ?? null;
}

export default function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <div style={{ paddingTop: 12 }}>
        <Route path="/" exact render={() => <h2>Home</h2>} />
        <Route path="/about" exact render={() => <h2>About</h2>} />
      </div>
    </Router>
  );
}
