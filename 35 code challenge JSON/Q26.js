fetch("https://jsonplaceholder.typicode.com/users")
  .then((r) => r.json())
  .then((d) => {
    let div = document.createElement("div");
    div.textContent = d[0].name;
    document.body.appendChild(div);
  });
