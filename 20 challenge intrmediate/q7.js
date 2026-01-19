import React, { useMemo, useState } from "react";

export default function Q7_MultiStepForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "Ahmad Toffaha", age: "20", city: "", address: "" });
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    const a = Number(form.age);
    if (!Number.isFinite(a) || a <= 0) e.age = "Age must be a valid number";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.address.trim()) e.address = "Address is required";
    return e;
  }, [form]);

  const canNext = () => {
    if (step === 1) return !errors.name && !errors.age;
    if (step === 2) return !errors.city && !errors.address;
    return true;
  };

  const next = () => {
    if (!canNext()) {
      if (step === 1) setTouched((t) => ({ ...t, name: true, age: true }));
      if (step === 2) setTouched((t) => ({ ...t, city: true, address: true }));
      return;
    }
    setStep((s) => Math.min(3, s + 1));
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 560 }}>
      <h2>Multi-step Form</h2>
      <div style={{ marginBottom: 12 }}>Step {step} / 3</div>

      {step === 1 ? (
        <div style={{ display: "grid", gap: 10 }}>
          <div>
            <input
              value={form.name}
              onChange={onChange("name")}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="Name"
              style={{ width: "100%", padding: 8 }}
            />
            {touched.name && errors.name ? <div style={{ color: "crimson" }}>{errors.name}</div> : null}
          </div>
          <div>
            <input
              value={form.age}
              onChange={onChange("age")}
              onBlur={() => setTouched((t) => ({ ...t, age: true }))}
              placeholder="Age"
              style={{ width: "100%", padding: 8 }}
            />
            {touched.age && errors.age ? <div style={{ color: "crimson" }}>{errors.age}</div> : null}
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div style={{ display: "grid", gap: 10 }}>
          <div>
            <input
              value={form.city}
              onChange={onChange("city")}
              onBlur={() => setTouched((t) => ({ ...t, city: true }))}
              placeholder="City"
              style={{ width: "100%", padding: 8 }}
            />
            {touched.city && errors.city ? <div style={{ color: "crimson" }}>{errors.city}</div> : null}
          </div>
          <div>
            <input
              value={form.address}
              onChange={onChange("address")}
              onBlur={() => setTouched((t) => ({ ...t, address: true }))}
              placeholder="Address"
              style={{ width: "100%", padding: 8 }}
            />
            {touched.address && errors.address ? <div style={{ color: "crimson" }}>{errors.address}</div> : null}
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Review</div>
          <div>Name: {form.name}</div>
          <div>Age: {form.age}</div>
          <div>City: {form.city}</div>
          <div>Address: {form.address}</div>
        </div>
      ) : null}

      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button onClick={prev} disabled={step === 1}>
          Back
        </button>
        <button onClick={next}>{step === 3 ? "Finish" : "Next"}</button>
      </div>
    </div>
  );
}
