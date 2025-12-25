
const ul = document.getElementById("list");
ul.addEventListener("click", (e) => {
  if (e.target.tagName !== "LI") return;
  ul.querySelectorAll("li").forEach(li => li.classList.remove("selected"));
  e.target.classList.add("selected");
});
