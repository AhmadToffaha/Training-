function safeDivide(a, b = 1) {
  if (b === 0) return "∞";
  return a / b;
}

console.log(safeDivide(10, 2));
console.log(safeDivide(10));
console.log(safeDivide(10, 0)); 
