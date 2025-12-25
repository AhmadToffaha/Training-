
document.querySelectorAll("#list li").forEach(li => {
  li.addEventListener("click", (e) => {
    console.log(e.currentTarget.nextElementSibling?.textContent || "no next sibling");
  });
});
