function start() { console.log("starting..."); }
function stop() { console.log("stopping..."); }
function pause() { console.log("pausing..."); }

const command = "pause";

switch (command) {
  case "start":
    start();
    break;
  case "stop":
    stop();
    break;
  case "pause":
    pause();
    break;
  default:
    console.log("unknown");
}
