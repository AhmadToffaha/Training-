fetch("https://jsonplaceholder.typicode.com/users")
  .then((r) => r.json())
  .then((d) => d.forEach((u) => console.log(u.name)));
