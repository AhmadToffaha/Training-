let t = JSON.stringify({ x: 10, y: 20 });
let p = JSON.parse(t);
document.body.textContent = p.x + p.y;
