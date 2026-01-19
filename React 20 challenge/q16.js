import React, { useState } from "react";

export default function ValidatedForm() {
  const [form, setForm] = useState({ name: "Ahmad Toffaha", email: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    const name = form.name.trim();
    const email = form.email.trim();

    if (name.length < 3) next.name = "Name must be at least 3 characters";
    if (!email.includes("@")) next.email = "Email must include @";

    return next;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      alert("Submitted");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          placeholder="Name"
        />
        {errors.name && <div>{errors.name}</div>}
      </div>

      <div>
        <input
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          placeholder="Email"
        />
        {errors.email && <div>{errors.email}</div>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
