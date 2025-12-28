fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((r) => r.json())
  .then((d) => {
    let h = document.createElement("h2");
    h.textContent = d.title;
    document.body.appendChild(h);
  });
