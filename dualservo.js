var five = require("johnny-five"), 
    board = new five.Board();
var program = require('commander');
var keypress = require('keypress');

program
  .version('1.0.0')
  .option('-f, --fileName <program>', 'Program to load', String)
  .parse(process.argv);


board.on("ready", function() {
  console.log("board ready. left right arrow keys, 'q' to quit.");
  var servoRightLeft = new five.Servo({
    "pin": 9
    });

  var servoUpDown = new five.Servo({
    "pin": 11
    });

  process.stdin.on('keypress', function (ch, key) {
    // console.log('got "keypress"', key);
    if (key && key.name == 'd') {
      servoRightLeft.to(0);
    }
    if (key && key.name == 'a') {
      servoRightLeft.to(180);
    }
    if (key && key.name == 's') {
      servoUpDown.to(0);
    }
    if (key && key.name == 'w') {
      servoUpDown.to(180);
    }
    if(key && key.name == 'q') {
      process.exit(0);
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();
});