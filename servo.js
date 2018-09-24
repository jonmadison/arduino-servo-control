var five = require("johnny-five"), 
    board = new five.Board();
var program = require('commander');
var keypress = require('keypress');

program
  .version('1.0.0')

board.on("ready", function() {
  console.log("board ready. left right arrow keys, 'q' to quit.");
  var servo = new five.Servo({
    "pin": 11,
    "startAt":program.startAt
    });
  process.stdin.on('keypress', function (ch, key) {
    // console.log('got "keypress"', key);
    if (key && key.name == 'right') {
      servo.to(0);
    }
    if (key && key.name == 'left') {
      servo.to(180);
    }
    if(key && key.name == 'q') {
      process.exit(0);
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();
});