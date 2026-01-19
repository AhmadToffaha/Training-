import React, { createContext, useContext, useMemo, useRef, useSyncExternalStore } from "react";

function createStore(reducer, preloadedState, middleware = []) {
  let state = preloadedState;
  const listeners = new Set();

  const baseDispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((l) => l());
    return action;
  };

  let dispatch = baseDispatch;
  const api = {
    getState: () => state,
    dispatch: (a) => dispatch(a),
  };

  const chain = middleware.map((mw) => mw(api));
  dispatch = chain.reduceRight((next, mw) => mw(next), baseDispatch);

  return {
    getState: api.getState,
    dispatch: api.dispatch,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const StoreContext = createContext(null);

export function StoreProvider({ reducer, initialState, middleware, children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) storeRef.current = createStore(reducer, initialState, middleware);
  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
}

export function useStoreSelector(selector) {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Missing StoreProvider");
  return useSyncExternalStore(store.subscribe, () => selector(store.getState()), () => selector(store.getState()));
}

export function useStoreDispatch() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Missing StoreProvider");
  return store.dispatch;
}

const logger = ({ getState }) => (next) => (action) => {
  const res = next(action);
  getState();
  return res;
};

function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + 1 };
    case "setUser":
      return { ...state, user: action.user };
    default:
      return state;
  }
}

function Counter() {
  const count = useStoreSelector((s) => s.count);
  const user = useStoreSelector((s) => s.user);
  const dispatch = useStoreDispatch();
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div>Count: {count}</div>
      <div>User: {user}</div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => dispatch({ type: "inc" })}>+1</button>
        <button onClick={() => dispatch({ type: "setUser", user: "Ahmad Toffaha" })}>Set User</button>
      </div>
    </div>
  );
}

export default function App() {
  const middleware = useMemo(() => [logger], []);
  return (
    <div style={{ padding: 16 }}>
      <h3>Reducer + Middleware Store</h3>
      <StoreProvider reducer={reducer} initialState={{ count: 0, user: "" }} middleware={middleware}>
        <Counter />
      </StoreProvider>
    </div>
  );
}
