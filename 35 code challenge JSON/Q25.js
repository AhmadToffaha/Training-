fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify({ title: "Test" }),
  headers: { "Content-Type": "application/json" },
});
