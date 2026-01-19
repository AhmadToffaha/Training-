import React, { useEffect, useState } from "react";

function mockFetchUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: userId === "1" ? "Ahmad Toffaha" : "User " + userId, age: 20 });
    }, 600);
  });
}

export default function Q13_UseEffectDepsTrap() {
  const [userId, setUserId] = useState("1");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    mockFetchUser(userId)
      .then((u) => {
        if (alive) setUser(u);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [userId]);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>Fetch by userId</h2>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <label>User ID:</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div style={{ marginTop: 12 }}>
        {loading ? "Loading..." : user ? `${user.name} (age ${user.age})` : "No user"}
      </div>
    </div>
  );
}
