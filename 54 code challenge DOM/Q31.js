
document.querySelectorAll("#list li").forEach(li => {
  li.addEventListener("click", (e) => {
    const parent = e.currentTarget.parentElement;
    console.log(parent);
    console.log(parent.children);
  });
});
