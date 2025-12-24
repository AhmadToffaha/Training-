let a = "10";
let b = 10;

if (a == b) console.log("a == b is true (loose equality: type coercion happens)");
else console.log("a == b is false");

if (a === b) console.log("a === b is true (strict equality: same type & value)");
else console.log("a === b is false (different types: string vs number)");
