function applyDiscount(price, percent = 10) {
  return price - (price * (percent / 100));
}

console.log(applyDiscount(200));
console.log(applyDiscount(200, 25)); 
