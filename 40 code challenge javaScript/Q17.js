const day = "Sat"; 

switch (day) {
  case "Mon":
  case "Tue":
  case "Wed":
  case "Thu":
  case "Fri":
    console.log("weekday");
    break;
  case "Sat":
  case "Sun":
    console.log("weekend");
    break;
  default:
    console.log("invalid day");
}
