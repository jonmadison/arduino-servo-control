var five = require("johnny-five"), 
    board = new five.Board();
var program = require('commander');
var keypress = require('keypress');

program
  .version('1.0.0')
  .option('-s --startAt <0-360>', 'start at', Number)
  .option('-r, --rotateDegrees', 'rotate degrees', Number)
  // .option('-s, --speed <0-1>', 'speed', Number);
  .parse(process.argv);

// if(!program.startAt) {
//   program.startAt = 0;
// }

// if(!program.rotateDegrees) {
//   console.log('need rotate degrees');
//   process.exit(1);
// }


board.on("ready", function() {
  console.log("board ready. left right arrow keys, 'q' to quit.");
  var servo = new five.Servo({
    "pin": 9,
    "startAt":program.startAt,
    "type":"continuous"
    });
  process.stdin.on('keypress', function (ch, key) {
    // console.log('got "keypress"', key);
    if (key && key.name == 'right') {
      servo.cw(1);
    }
    if (key && key.name == 'left') {
      servo.ccw(1);
    }
    if(key && key.name == 'q') {
      process.exit(0);
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();

  // process.exit(0);
});