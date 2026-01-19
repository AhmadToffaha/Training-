import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [status, setStatus] = useState("disconnected");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const wsRef = useRef(null);
  const retryRef = useRef(0);

  const connect = () => {
    try {
      setStatus("connecting");
      const ws = new WebSocket("wss://echo.websocket.events");
      wsRef.current = ws;
      ws.onopen = () => {
        retryRef.current = 0;
        setStatus("connected");
        ws.send(JSON.stringify({ user: "Ahmad Toffaha", msg: "joined" }));
      };
      ws.onmessage = (e) => {
        setMessages((prev) => [...prev, e.data]);
      };
      ws.onclose = () => {
        setStatus("disconnected");
        const retry = Math.min(5, retryRef.current + 1);
        retryRef.current = retry;
        setTimeout(connect, 600 * retry);
      };
      ws.onerror = () => {
        try { ws.close(); } catch {}
      };
    } catch {
      setStatus("disconnected");
    }
  };

  useEffect(() => {
    connect();
    return () => {
      try { wsRef.current?.close(); } catch {}
    };
  }, []);

  const send = () => {
    const v = text.trim();
    if (!v) return;
    try {
      wsRef.current?.send(v);
      setText("");
    } catch {}
  };

  return (
    <div style={{ padding: 16, maxWidth: 520 }}>
      <h3>WebSocket Chat</h3>
      <div>Status: {status}</div>
      <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12, height: 220, overflow: "auto", marginTop: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 6 }}>{m}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Message" style={{ flex: 1 }} />
        <button onClick={send} disabled={status !== "connected"}>Send</button>
      </div>
    </div>
  );
}
