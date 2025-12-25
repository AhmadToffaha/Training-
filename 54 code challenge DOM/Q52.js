
const wrap = document.createElement("div");
const input = document.createElement("input");
input.placeholder = "Add item...";
const add = document.createElement("button");
add.type = "button";
add.textContent = "Add";
const list = document.createElement("ul");

add.addEventListener("click", () => {
  const t = input.value.trim();
  if (!t) return;

  const li = document.createElement("li");
  const text = document.createElement("span");
  text.textContent = t;

  text.addEventListener("click", () => {
    text.style.textDecoration = (text.style.textDecoration === "line-through") ? "none" : "line-through";
  });

  const del = document.createElement("button");
  del.type = "button";
  del.textContent = "X";
  del.addEventListener("click", () => li.remove());

  li.append(text, del);
  list.appendChild(li);
  input.value = "";
});

wrap.append(input, add, list);
document.body.appendChild(wrap);
