fetch("https://jsonplaceholder.typicode.com/users")
  .then((r) => r.json())
  .then((d) => {
    let t = document.createElement("table");
    d.forEach((u) => {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      td.textContent = u.name;
      tr.appendChild(td);
      t.appendChild(tr);
    });
    document.body.appendChild(t);
  });
