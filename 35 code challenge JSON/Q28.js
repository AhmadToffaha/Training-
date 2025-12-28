document.body.addEventListener(
  "click",
  () => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((r) => r.json())
      .then((d) => {
        let p = document.createElement("pre");
        p.textContent = JSON.stringify(d, null, 2);
        document.body.appendChild(p);
      });
  },
  { once: true }
);
