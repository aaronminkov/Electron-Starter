const {app, BrowserWindow, ipcMain } = require('electron');
// First, important the essentials from Electron. ipcMain will be used to communicate with your renderer/front-end process.

const appPath = app.getAppPath();
require('electron-reload')(appPath, {
  electron: require(`${appPath}/node_modules/electron`)
});
// I always suggest working with electron-reload. When you save any file in your project folder,
// it'll refresh the Electron instance, thus saving you the hassle of restarting the app yourself.

const path = require('path');
const url = require('url');
let mainWindow;
//Here, we require a few dependencies and define our main window named mainWindow.

function createWindow() {
  // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000, // You can change the width and height however you'd like. These are just example values.
        height: 600,
        show: false, // Notice how I tell Electron NOT to show the page. See "mainWindow.once('ready-to-show')" below for more info!
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

  // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWindow.loadURL(startUrl);
    // This here loads your index.html as the main page for the Electron application.

    mainWindow.setResizable(false)
    mainWindow.setFullScreenable(false)
    mainWindow.setMaximizable(false)
    mainWindow.isResizable(false);
    // The above options are not essential, but they make your Electron application look more like a desktop
    // application as opposed to a webpage. This enhances user experience, so I recommend it!

    // mainWindow.webContents.openDevTools();
    // If you need to open Chrome DevTools (to debug your application), uncomment the above line.

    mainWindow.setMenu(null);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    })
    // Once Electron has prepared the application, you then want to show the main page (mainWindow.show();) and
    // bring that page to the top of your computer screen (mainWindow.focus();). This prevents a white flash before
    // your page loads.
}

ipcMain.on('mainwindow:min', () => {
  mainWindow.minimize();
});
// When somebody presses the minimize icon on the main window, call the minimize() function!

ipcMain.on('mainwindow:close', () => {
  app.quit();
})
// When somebody presses the close icon on the main window, call the quit() function to close the app!

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
// Since Mac applications usually don't fully "quit" when all the pages are closed,
// this will only quit the app if all pages are closed on machines **other** than Macs.

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

// After all this, you can include other ipcMain.on('blahblah') functions to handle calls from the renderer process,
// and much more! Happy coding. - Aaron

ipcMain.on('doSomething', () => {
    // Some sort of code here that does something on the backend.
    
    mainWindow.webContents.send('doSomethingReturn');
    // Send something back to the frontend.
})