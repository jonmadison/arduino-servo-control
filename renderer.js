const electron = require('electron')
const { ipcRenderer, remote } = electron;
const log = require('electron-log');
let SERVO_DELTA_THRESHOLD = 0.95

const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize


let servo_to = document.getElementById('servo-to')
let to_x, to_y, last_to_x, last_to_y


ipcRenderer.on('board-ready', function(event) {
    console.log("board is ready in renderer")
    // text("Board is connected", 25, 100)
    // message.innerHTML = 'Board is connected'
})

ipcRenderer.on('button-pressed', function(event) {
    console.log('button-pressed')
    scare_spider = true
})

// ipcRenderer.on('button-pressed', function(event) {
//     console.log('button-pressed')
//     document.getElementById('indicator-container').style.backgroundColor = '#54CC14';
//     message.innerHTML = 'pressed'
// })

// ipcRenderer.on('button-released', function(event) {
//     document.getElementById('indicator-container').style.backgroundColor = 'transparent';
//     message.innerHTML = 'released'
// })


ipcRenderer.on('joystick-change', function(event, x, y) {
    joystickX = x
    joystickY = y
})

ipcRenderer.on('servo-to', function(event, to_val_x, to_val_y) {
    to_x = to_val_x
    to_y = to_val_y

    if(Math.abs(last_to_x - to_val_x) > SERVO_DELTA_THRESHOLD) {
        // console.log(`to changed: ${to_x}`)
        last_to_x = to_val_x
        // text(`servo to ${to_x}, ${to_y}`, 25, 200)
        // servo_to.innerHTML = `${to_x}, ${to_y}`
    }

    if(Math.abs(last_to_y != to_val_y) > SERVO_DELTA_THRESHOLD) {
        // console.log(`to changed: ${to_y}`)
        last_to_y = to_val_y
        // text(`servo to ${to_x}, ${to_y}`, 25, 200)
    }
})

