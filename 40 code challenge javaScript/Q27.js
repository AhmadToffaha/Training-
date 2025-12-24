function formatName(first, last = "") {
  return `${first} ${last}`.trim();
}

console.log(formatName("Nader", "Hantash"));
console.log(formatName("Nader"));             
