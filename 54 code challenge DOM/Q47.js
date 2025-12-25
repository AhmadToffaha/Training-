
const products = [
  { id: 1, name: "Apple", price: 3 },
  { id: 2, name: "Orange", price: 2 }
];

const container = document.getElementById("container");
const details = document.getElementById("details");
container.innerHTML = "<h3>Products</h3>";

products.forEach(p => {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = `${p.name} ($${p.price})`;
  b.addEventListener("click", () => {
    details.innerHTML = `<h3>Details</h3><p>ID: ${p.id}</p><p>Name: ${p.name}</p><p>Price: $${p.price}</p>`;
  });
  container.appendChild(b);
});
