import React from "react";

function UserCard({ name, title }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{title}</p>
    </div>
  );
}

export default function App() {
  return <UserCard name="Ahmad Toffaha" title="20" />;
}
