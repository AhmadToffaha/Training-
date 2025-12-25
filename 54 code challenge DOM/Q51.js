
const btn = document.createElement("button");
btn.type = "button";
btn.textContent = "Click Counter";

let clicks = 0;

const label = document.createElement("span");
label.style.marginLeft = "10px";
label.textContent = "0";

btn.addEventListener("click", () => {
  clicks++;
  label.textContent = String(clicks);
});

document.body.append(btn, label);
