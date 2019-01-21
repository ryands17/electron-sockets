const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

let mainWindow

function createWindow() {
  // var screenElectron = electron.screen;
  // var mainScreen = screenElectron.getPrimaryDisplay();
  // var dimensions = mainScreen.size;
  mainWindow = new BrowserWindow({
    width: 1364,
    height: 768,
    webPreferences: {
      webSecurity: false,
    },
  })

  mainWindow.setMinimumSize(1364, 768)
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : url.format({
          pathname: path.join(__dirname, '../build/index.html'),
          protocol: 'file:',
          slashes: true,
        })
  )
  isDev && mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    return (mainWindow = null)
  })
}

app.on('ready', () => {
  createWindow()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
