console.log(declared());
console.log(expressed());

function declared() { return "A"; }
const expressed = function () { return "B"; };

