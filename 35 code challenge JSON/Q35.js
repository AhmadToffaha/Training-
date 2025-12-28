fetch("https://jsonplaceholder.typicode.com/todos")
  .then((r) => r.json())
  .then((d) => {
    let div = document.createElement("div");
    div.textContent = d.length;
    document.body.appendChild(div);
  });
