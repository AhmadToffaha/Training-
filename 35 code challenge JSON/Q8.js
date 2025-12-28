let o = JSON.parse(
  '{"products":[{"name":"A","price":40},{"name":"B","price":60}]}'
);
o.products.filter((p) => p.price > 50).forEach((p) => console.log(p.name));
