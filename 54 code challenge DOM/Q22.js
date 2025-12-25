
document.querySelectorAll("#list li").forEach(li => {
  li.addEventListener("click", (e) => {
    e.currentTarget.style.backgroundColor = "#cde";
  });
});
