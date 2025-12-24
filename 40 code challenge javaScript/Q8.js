const user = { role: "editor", active: true };

if ((user.role === "admin" || user.role === "editor") && user.active === true) {
  console.log("can-edit");
}
