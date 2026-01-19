import React, { useMemo, useState } from "react";

export default function Q25_FileUploadPreview() {
  const [file, setFile] = useState(null);

  const previewUrl = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  const onChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) {
      setFile(null);
      return;
    }
    if (!f.type.startsWith("image/")) {
      setFile(null);
      return;
    }
    setFile(f);
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <h2>Image Upload Preview</h2>
      <input type="file" accept="image/*" onChange={onChange} />

      {file ? (
        <div style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 8 }}>{file.name}</div>
          <img src={previewUrl} alt="preview" style={{ maxWidth: "100%", borderRadius: 12 }} />
        </div>
      ) : (
        <div style={{ marginTop: 12, color: "#555" }}>Choose an image file</div>
      )}
    </div>
  );
}
