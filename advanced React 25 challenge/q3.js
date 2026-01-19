import React, { useCallback, useMemo, useRef, useState } from "react";

export function useForm({ initialValues, validate }) {
  const [values, setValues] = useState(() => ({ ...initialValues }));
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const validateId = useRef(0);

  const runValidate = useCallback(
    async (nextValues) => {
      if (!validate) {
        setErrors({});
        return {};
      }
      const id = ++validateId.current;
      const res = await validate(nextValues);
      if (id !== validateId.current) return null;
      setErrors(res || {});
      return res || {};
    },
    [validate]
  );

  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValue(name, type === "checkbox" ? checked : value);
  }, [setValue]);

  const handleBlur = useCallback(async (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    await runValidate({ ...values, [name]: values[name] });
  }, [runValidate, values]);

  const reset = useCallback(() => {
    validateId.current++;
    setValues({ ...initialValues });
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = useMemo(() => Object.keys(errors || {}).length === 0, [errors]);

  return { values, errors, touched, setValue, setValues, setErrors, setTouched, validate: runValidate, reset, handleChange, handleBlur, isValid };
}

export default function App() {
  const form = useForm({
    initialValues: { name: "Ahmad Toffaha", age: "20", email: "" },
    validate: async (v) => {
      await new Promise((r) => setTimeout(r, 250));
      const e = {};
      if (!v.name || v.name.trim().length < 3) e.name = "Name must be at least 3 chars";
      if (!v.email || !v.email.includes("@")) e.email = "Invalid email";
      if (!v.age || Number.isNaN(Number(v.age))) e.age = "Age must be a number";
      return e;
    },
  });

  const [submitted, setSubmitted] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const errs = await form.validate(form.values);
    if (errs && Object.keys(errs).length === 0) setSubmitted(form.values);
  };

  return (
    <div style={{ padding: 16, maxWidth: 520 }}>
      <h3>Advanced Form Hook</h3>
      <form onSubmit={submit}>
        <div style={{ display: "grid", gap: 10 }}>
          <label>
            Name
            <input name="name" value={form.values.name} onChange={form.handleChange} onBlur={form.handleBlur} style={{ width: "100%" }} />
            {form.touched.name && form.errors.name && <div style={{ color: "crimson" }}>{form.errors.name}</div>}
          </label>
          <label>
            Age
            <input name="age" value={form.values.age} onChange={form.handleChange} onBlur={form.handleBlur} style={{ width: "100%" }} />
            {form.touched.age && form.errors.age && <div style={{ color: "crimson" }}>{form.errors.age}</div>}
          </label>
          <label>
            Email
            <input name="email" value={form.values.email} onChange={form.handleChange} onBlur={form.handleBlur} style={{ width: "100%" }} />
            {form.touched.email && form.errors.email && <div style={{ color: "crimson" }}>{form.errors.email}</div>}
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">Submit</button>
            <button type="button" onClick={form.reset}>Reset</button>
          </div>
        </div>
      </form>
      {submitted && (
        <pre style={{ marginTop: 12, background: "#f6f6f6", padding: 12, overflow: "auto" }}>{JSON.stringify(submitted, null, 2)}</pre>
      )}
    </div>
  );
}
