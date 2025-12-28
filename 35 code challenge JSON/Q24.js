fetch("https://jsonplaceholder.typicode.com/photos")
  .then((r) => r.json())
  .then((d) => {
    let i = document.createElement("img");
    i.src = d[0].url;
    document.body.appendChild(i);
  });
