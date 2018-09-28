const CAN_LOSE = false 

var spidey_x, spidey_y
var spidey_origin_x, spidey_origin_y
var joystickX, joystickY = 1
var player_img
var offset_x, offset_y = 0
var easing = 0.05;
var buggyX
var red, green, blue
var scare_spider = false
let audio = new Audio('sounds/hum.mp3');
const BALL_RADIUS = 75
var speed
var score
const START_SPEED = 3
const AVAILABLE_BUGGIES = 7
const WIGGLE_MIN = -4
const WIGGLE_MAX = 4
var buggies = []
var current_buggy

function rgbRandom() {
  red = random(0,90)
  green = random(0,90)
  blue = random(0,90)
  return {red, green, blue}
}

function nextLevel() {
  buggyY = 0
  buggyX = width * Math.random()
  current_buggy = choose_bug(AVAILABLE_BUGGIES)
  speed++
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  score = 0
  player_img = loadImage("images/spidey.png")
  bg = loadImage("images/texture_concrete_wall.jpg")
  buggyY = 0
  buggyX = random(50,windowWidth-BALL_RADIUS)
  for(let i = 0; i < AVAILABLE_BUGGIES; i++) {
    buggies[i] = new Buggy(`images/buggies/${i}.png`,buggyX,buggyY)
  }
  current_buggy = choose_bug(AVAILABLE_BUGGIES)

  // image(img,spidey_x,spidey_y);

  spidey_origin_x = windowWidth/2 - player_img.width
  spidey_origin_y = windowHeight/2 - player_img.height
  spidey_x = spidey_origin_x
  spidey_y = spidey_origin_y
  // background(bg);
  let {red, green, blue} = rgbRandom()

  speed = START_SPEED
}

function restart() {
  score = 0
  createCanvas(windowWidth, windowHeight);
  buggyY = windowWidth
  buggyX = height/2
  spidey_origin_x = windowWidth/2 - player_img.width
  spidey_origin_y = windowHeight/2 - player_img.height
  spidey_x = spidey_origin_x
  spidey_y = spidey_origin_y
  // background(bg);
  let {red, green, blue} = rgbRandom()

}

function Buggy(image_name, x,y) {
  this.x = x
  this.y = y
  let bug_img = loadImage(image_name,x,y)
  return bug_img
}

function choose_bug(num_choices) {
  let bug_num = Math.trunc(random(0,AVAILABLE_BUGGIES-1))
  return buggies[bug_num]
}

function updateScore(score) {
  fill(red,green,blue, 222)
  textStyle(BOLD);
  textFont("Amazon Ember")
  textSize(100); 
  text(`score: ${score}`, windowWidth/2 + 200, 120)
}

function draw() {
  background(bg);

  updateScore(score)
  textSize(40)
  fill(255)
  text("Eat bugs! Red button for a smart bomb.",100,100)

  spidey_x = (joystickX * windowWidth/2) + spidey_origin_x - player_img.width/2
  spidey_y = (joystickY * windowHeight/2) + spidey_origin_y - player_img.height / 2

  image(player_img,spidey_x,spidey_y);

  // stroke(199)
  let max = 3
  let ballCount = Math.floor(Math.random() * Math.floor(max))
  image(current_buggy,buggyX,buggyY);

  buggyY += speed
  buggyX += random(WIGGLE_MIN,WIGGLE_MAX)
  if(buggyY >= windowHeight+BALL_RADIUS) {
    if(CAN_LOSE) {
      fill(255);
      textFont("Amazon Ember")
      textSize(200); 
      text(`YOU LOSE`, windowWidth/2 - 200)
      alert("YOU LOSE")
      restart()
    } else {
      nextLevel()
    }
 
    //increase speed
  }

  d = dist(buggyX, buggyY, spidey_x, spidey_y)
  if (d < player_img.width/2) {
    // audio.play()
    // alert(score)
    score++
    updateScore(score)
    current_buggy = choose_bug(AVAILABLE_BUGGIES)
    nextLevel()
  }

  if(scare_spider == true) {
    audio.play()
    alert("BOO.")
    textSize(400); 
    // textAlign(CENTER)
    fill(238,148,59)
    stroke(0)
    text("BOO.", 0, windowHeight/2 + 200)
    // alert("BOO")
    scare_spider = false
    // noLoop()
    restart()
  }

}

function mousePressed() {
  // background(bg);
}