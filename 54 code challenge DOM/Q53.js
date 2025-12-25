
const box = document.createElement("div");
box.style.width = "40px";
box.style.height = "40px";
box.style.background = "purple";
box.style.position = "relative";
box.style.left = "0px";
document.body.appendChild(box);

let pos = 0;
setInterval(() => {
  pos = (pos + 2) % 200;
  box.style.left = pos + "px";
}, 30);
