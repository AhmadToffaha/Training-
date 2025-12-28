try {
  JSON.parse("{bad}");
} catch (e) {
  console.log("Invalid JSON");
}
