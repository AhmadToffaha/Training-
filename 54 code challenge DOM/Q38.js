
const n = document.createElement("div");
n.textContent = "Notification: will disappear in 3 seconds";
n.style.padding = "10px";
n.style.border = "1px solid #333";
n.style.margin = "8px 0";
document.body.appendChild(n);
setTimeout(() => n.remove(), 3000);
