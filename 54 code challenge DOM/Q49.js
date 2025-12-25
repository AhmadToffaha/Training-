
document.getElementById("myForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const fields = [document.getElementById("fName"), document.getElementById("fAge")];
  let ok = true;

  fields.forEach(f => {
    f.classList.remove("error");
    if (!f.value.trim()) {
      f.classList.add("error");
      ok = false;
    }
  });

  console.log(ok ? "Valid ✅" : "Invalid ❌");
});
