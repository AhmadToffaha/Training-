fetch("https://jsonplaceholder.typicode.com/comments")
  .then((r) => r.json())
  .then((d) => d.slice(0, 5).forEach((c) => console.log(c.email)));
