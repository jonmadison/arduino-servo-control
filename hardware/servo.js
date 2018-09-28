
var program = require('commander');
var keypress = require('keypress');

program
  .version('1.0.0')

board.on("ready", function() {
  console.log("board ready. left right arrow keys, 'q' to quit.");
  // Create a new `joystick` hardware instance.
  var joystick = new five.Joystick({
    //   [ x, y ]
    pins: ["A0", "A1"]
  });

  joystick.on("change", function() {
    let to = ((this.x+1) * 180)/2
    servo.to(to)
    console.log(`servo to ${to}`)
  });

  // Create a new `button` hardware instance.
  var button = new five.Button(2);

  button.on("hold", function() {
    console.log( "Button held" );
  });

  button.on("press", function() {
    console.log( "Button pressed" );
  });

  button.on("release", function() {
    console.log( "Button released" );
  });

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