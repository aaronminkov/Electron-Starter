const { ipcRenderer } = require('electron');

let minimizeButton = document.getElementById('minimize');
minimizeButton.addEventListener('click', () => {
    ipcRenderer.send('mainwindow:min');
})

let closeButton = document.getElementById('quit');
closeButton.addEventListener('click', () => {
    ipcRenderer.send('mainwindow:close');
})

let doSomethingButton = document.getElementById('doSomething');
doSomethingButton.addEventListener('click', () => {
    ipcRenderer.send('doSomething');
})

ipcRenderer.on('doSomethingReturn', () => {
    alert('Do Something Action Complete!')
    // Receive the return from doSomething in main.js and alert that the process is complete!
})