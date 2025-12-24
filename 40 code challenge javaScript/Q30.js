function repeatText(text, times = 1) {
  let out = "";
  for (let i = 0; i < times; i++) out += text;
  return out;
}

console.log(repeatText("Hi", 3));
console.log(repeatText("Hi"));   
