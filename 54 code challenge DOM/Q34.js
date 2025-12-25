
const b = document.createElement("button");
b.type = "button";
b.textContent = "Dynamic Button";
b.addEventListener("click", () => alert("Dynamic button clicked!"));
document.body.appendChild(b);
