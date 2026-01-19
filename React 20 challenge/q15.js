import React, { useState } from "react";

export default function SimpleForm() {
  const [form, setForm] = useState({ name: "Ahmad Toffaha", email: "" });
  const [submitted, setSubmitted] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(form);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          placeholder="Name"
        />
        <input
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          placeholder="Email"
        />
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div>
          <p>{submitted.name}</p>
          <p>{submitted.email}</p>
        </div>
      )}
    </div>
  );
}
