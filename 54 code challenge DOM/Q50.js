
const faqData = [
  { q: "What is DOM?", a: "DOM is the Document Object Model." },
  { q: "Why events?", a: "Events allow interaction with the page." }
];

const faq = document.getElementById("faq");
faq.innerHTML = "<h3>FAQ</h3>";

faqData.forEach(item => {
  const q = document.createElement("div");
  q.style.cursor = "pointer";
  q.style.fontWeight = "bold";
  q.textContent = item.q;

  const a = document.createElement("div");
  a.textContent = item.a;
  a.classList.add("hidden");

  q.addEventListener("click", () => a.classList.toggle("hidden"));
  faq.append(q, a);
});
