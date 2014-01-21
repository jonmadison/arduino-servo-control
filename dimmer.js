var five = require("johnny-five"), 
    board = new five.Board( { port: "/dev/cu.usbserial-A9C37XL5", pins: [9] }),
    servo;
var program = require('commander');
var keypress = require('keypress');

program
  .version('1.0.0')
  .option('-d, --direction <direction>', 'Direction "up" or "down"')
  .parse(process.argv);

if(program.direction===undefined || 
  (program.direction!=="up" && program.direction!=="down")) {
  console.log('I need a direction, either "up" or "down". you said ' + program.direction);
  process.exit(1);
}

board.on("ready", function() {
  servo = new five.Servo({
    "pin": 9
  });
  if(program.direction==="up") {
    servo.to(0);
    setTimeout(function(){ process.exit(0) },1000);
  }

  if(program.direction==="down") {
    servo.min();
    servo.to(180);
    setTimeout(function(){ process.exit(0) },1000);
  }
});