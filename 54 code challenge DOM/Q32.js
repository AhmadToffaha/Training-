
let node = document.getElementById("btn1");
while (node && node !== document.body) node = node.parentElement;
console.log(node === document.body ? "Reached document.body" : "Not reached");
