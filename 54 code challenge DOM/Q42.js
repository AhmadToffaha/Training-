
const bio = document.getElementById("bio");
const counter = document.getElementById("counter");

function update() {
  counter.textContent = "Characters: " + bio.value.length;
}
bio.addEventListener("input", update);
update();
