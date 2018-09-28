var spidey_x, spidey_y
var spidey_origin_x, spidey_origin_y
var joystickX, joystickY = 1
var img
var offset_x, offset_y = 0
var easing = 0.05;
var buggyX
var red, green, blue
var scare_spider = false
let audio = new Audio('sounds/hum.mp3');
const BALL_RADIUS = 75

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("images/spidey.png")
  bg = loadImage("images/IMG_1839.jpeg")
  // image(img,spidey_x,spidey_y);
  buggyX = windowWidth
  buggyY = height/2
  spidey_origin_x = windowWidth/2 - img.width
  spidey_origin_y = windowHeight/2 - img.height
  spidey_x = spidey_origin_x
  spidey_y = spidey_origin_y
  background(bg);
  red = random(255)
  green = random(255)
  blue = random(255)
}

function restart() {
  createCanvas(windowWidth, windowHeight);
  buggyX = windowWidth
  buggyY = height/2
  spidey_origin_x = windowWidth/2 - img.width
  spidey_origin_y = windowHeight/2 - img.height
  spidey_x = spidey_origin_x
  spidey_y = spidey_origin_y
  background(bg);
  red = random(255)
  green = random(255)
  blue = random(255)
}

function Obstacle(x,y,radius) {
  this.x = x
  this.y = y
  this.shape = ellipse(this.x, this.y, BALL_RADIUS)
}

function draw() {
  background(bg);
  // spidey_x = windowWidth/2 - img.width/2
  // spidey_y = windowHeight/2 - img.height/2
  // spidey_x+=2
  fill(0);
  text("Amazon Ember")
  // textSize(40); 
  // text("Dumb SPider TOy!", 10,50)
  textSize(30)
  text("I've kidnapped a spider and tied them to a servo.",10,100)
  text("Use the joystick to move the spider buddy, and press the tiny button on the breadboard if you dare.",10,130)
  // let x_screen = (joystickX * windowWidth/2) + spidey_origin_x - img.width/2
  // let y_screen = (joystickY * windowHeight/2) + spidey_origin_y - img.height / 2
  // spidey_x = (joystickX * windowWidth/2) + spidey_origin_x - img.width/2
  // spidey_y = (joystickY * windowHeight/2) + spidey_origin_y - img.height / 2

  spidey_x = (joystickX * windowWidth/2) + spidey_origin_x - img.width/2
  spidey_y = (joystickY * windowHeight/2) + spidey_origin_y - img.height / 2

  image(img,spidey_x,spidey_y);

  fill(red,green,blue, 222)
  stroke(199)
  let max = 3
  let ballCount = Math.floor(Math.random() * Math.floor(max))
    let shape = new Obstacle(buggyX, buggyY, BALL_RADIUS)
    // let shape = ellipse(buggyX, buggyY, BALL_RADIUS, BALL_RADIUS)
    buggyX = buggyX - 10
    shape.x = buggyX
    if(buggyX == 0) {
      buggyX = windowWidth
      buggyY = height * Math.random()
    }

    d = dist(buggyX, buggyY, spidey_x, spidey_y)
    if (d < img.width/2) {
      audio.play()
      alert("YOU DED")
      restart()
    }

    if(scare_spider == true) {
      audio.play()
      alert("BOO")
      scare_spider = false
      // noLoop()
      restart()
    }
    
  // text(`joystick: ${joystickX}, ${joystickY}`, 25, 200)

  // text(`origin: ${spidey_origin_x}, ${spidey_origin_y} img is ${img.width}x${img.height}`, 10,100)
  // text(`${windowWidth} x ${windowHeight}`, 10,150)

  // spidey_x = 20

  // textSize(20); 
  // text(`spidey at ${x_screen}, ${y_screen}`, 25, 25);

  // ellipse(mouseX, mouseY, 20, 20);

}

function mousePressed() {
  background(bg);
}