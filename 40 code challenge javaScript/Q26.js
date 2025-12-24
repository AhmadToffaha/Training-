function pow(base, exp = 2) {
  let result = 1;
  for (let i = 0; i < exp; i++) result *= base;
  return result;
}

console.log(pow(5));
console.log(pow(2, 3)); 
