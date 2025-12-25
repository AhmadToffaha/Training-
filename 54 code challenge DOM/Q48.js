
const wrap = document.createElement("div");
const img = document.createElement("img");
img.width = 240;

const imgs = [
  "https://via.placeholder.com/240x120?text=1",
  "https://via.placeholder.com/240x120?text=2",
  "https://via.placeholder.com/240x120?text=3"
];

let idx = 0;
img.src = imgs[idx];

const prev = document.createElement("button");
prev.type = "button";
prev.textContent = "Prev";

const next = document.createElement("button");
next.type = "button";
next.textContent = "Next";

prev.addEventListener("click", () => {
  idx = (idx - 1 + imgs.length) % imgs.length;
  img.src = imgs[idx];
});
next.addEventListener("click", () => {
  idx = (idx + 1) % imgs.length;
  img.src = imgs[idx];
});

wrap.append(prev, img, next);
document.body.appendChild(wrap);
