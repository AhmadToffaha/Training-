
const card = document.createElement("div");
card.className = "card";
card.innerHTML = `
  <img src="https://via.placeholder.com/260x120" width="260" alt="card"/>
  <h4>Card Title</h4>
  <p>This card was created using JavaScript.</p>
`;
const btn = document.createElement("button");
btn.type = "button";
btn.textContent = "Details";
btn.addEventListener("click", () => alert("Card details clicked"));
card.appendChild(btn);
document.body.appendChild(card);
