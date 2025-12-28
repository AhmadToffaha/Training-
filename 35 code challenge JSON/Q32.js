fetch("https://jsonplaceholder.typicode.com/users")
  .then((r) => r.json())
  .then((d) =>
    d.filter((u) => u.name.includes("Le")).forEach((u) => console.log(u.name))
  );
