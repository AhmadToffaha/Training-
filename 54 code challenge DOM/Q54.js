
document.querySelectorAll("#tabs .tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const id = tab.getAttribute("data-tab");
    document.querySelectorAll("#tabs .tab-content").forEach(c => c.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
  });
});
