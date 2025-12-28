JSON.parse('{"tasks":["Task 1","Task 2"]}').tasks.forEach((t) => {
  let li = document.createElement("li");
  li.textContent = t;
  document.body.appendChild(li);
});
