
document.addEventListener("click", (e) => {
  console.log("Clicked:", e.target.tagName, e.target.id || e.target.className);
});
