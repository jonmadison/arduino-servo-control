const electron = require('electron')
const { ipcRenderer, remote } = electron;
const log = require('electron-log');
let SERVO_DELTA_THRESHOLD = 0.95
let audio = new Audio('sounds/hum.mp3');

const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let message = document.getElementById('message')
message.innerHTML = 'Waiting for Board...'
let servo_to = document.getElementById('servo-to')
let to_x, to_y, last_to_x, last_to_y

// let ctx = document.getElementById('wall_canvas').getContext('2d');
// let img = new Image
// img.src = "images/spidey.png"

// ipcRenderer.on('dom-is-ready', () => {
//     alert('move')
//     moveImageCanvas(100,100)
// })


ipcRenderer.on('board-ready', function(event) {
    console.log("board is ready in renderer")
    message.innerHTML = 'Board is connected'
})

let indicators = document.getElementsByClassName('servo-indicator')

ipcRenderer.on('button-pressed', function(event) {
    console.log('button-pressed')
    let ic = document.getElementById('indicator-container')
    ic.style.backgroundColor = '#ff4040';
    ic.animate(
        [
          { transform: 'rotate(0)', color: '#000' },
          { color: '#431236', offset: 0.3},
          { transform: 'rotate(360deg) scale(20)', color: '#000' }
        ], {
          duration: 250,
          iterations: 1
        }
      );
      audio.play();
    message.innerHTML = 'pressed'
})

// ipcRenderer.on('button-pressed', function(event) {
//     console.log('button-pressed')
//     document.getElementById('indicator-container').style.backgroundColor = '#54CC14';
//     message.innerHTML = 'pressed'
// })

ipcRenderer.on('button-released', function(event) {
    document.getElementById('indicator-container').style.backgroundColor = 'transparent';
    message.innerHTML = 'released'
})

let moveImageCanvas = (x, y) => {
    alert(`moveImageCanvas ${x}, ${y}`);
    (function() {        
        return function () {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(img, x, y);

        x += 1;
        if (x > ctx.canvas.width) {
            x = 0;
        }
        };
    })()
}

let moveImage = (x, y) => {
    let x_screen = (x/width) * 1000
    let y_screen = (y/width) * 1000
    console.log(`${x_screen},${y_screen}`)

    
    for (let i of indicators) {
        i.style.display = 'block';
        i.style.left = `${x_screen}%`;
        i.style.top = `${y_screen}%`;
    }
}
ipcRenderer.on('servo-to', function(event, to_val_x, to_val_y) {
    to_x = to_val_x
    to_y = to_val_y
    moveImage(to_x,to_y)

    if(Math.abs(last_to_x - to_val_x) > SERVO_DELTA_THRESHOLD) {
        // console.log(`to changed: ${to_x}`)
        last_to_x = to_val_x
        servo_to.innerHTML = `${to_x}, ${to_y}`
    }

    if(Math.abs(last_to_y != to_val_y) > SERVO_DELTA_THRESHOLD) {
        // console.log(`to changed: ${to_y}`)
        last_to_y = to_val_y
        servo_to.innerHTML = `${to_x}, ${to_y}`
    }
})

