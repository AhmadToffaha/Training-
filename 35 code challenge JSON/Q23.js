fetch("https://jsonplaceholder.typicode.com/todos")
  .then((r) => r.json())
  .then((d) =>
    d.filter((t) => t.completed).forEach((t) => console.log(t.title))
  );
