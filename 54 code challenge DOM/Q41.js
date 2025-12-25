
const wrap = document.createElement("div");
const input = document.createElement("input");
input.placeholder = "Add todo...";
const add = document.createElement("button");
add.type = "button";
add.textContent = "Add";
const list = document.createElement("ul");
wrap.append(input, add, list);
document.body.appendChild(wrap);

add.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;

  const edit = document.createElement("button");
  edit.type = "button";
  edit.textContent = "Edit";
  edit.addEventListener("click", () => {
    const newText = prompt("Edit todo:", span.textContent);
    if (newText !== null) span.textContent = newText.trim() || span.textContent;
  });

  const del = document.createElement("button");
  del.type = "button";
  del.textContent = "Delete";
  del.addEventListener("click", () => li.remove());

  li.append(span, edit, del);
  list.appendChild(li);
  input.value = "";
});
