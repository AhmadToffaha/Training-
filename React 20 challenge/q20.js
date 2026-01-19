import React, { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <h2>{count}</h2>;
}
