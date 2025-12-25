
const btn = document.createElement("button");
btn.type = "button";
btn.textContent = "Toggle Dark Mode";
btn.addEventListener("click", () => document.body.classList.toggle("dark"));
document.body.appendChild(btn);
