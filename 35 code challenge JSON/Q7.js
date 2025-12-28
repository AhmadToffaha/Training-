let o = JSON.parse('{"grades":[50,60,70]}');
console.log(o.grades.reduce((a, b) => a + b, 0));
