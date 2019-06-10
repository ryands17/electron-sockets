import { app, BrowserWindow } from 'electron'
import path from 'path'
import url from 'url'
import isDev from 'electron-is-dev'

let mainWindow

const createWindow = () => {
  // let screenElectron = electron.screen;
  // let mainScreen = screenElectron.getPrimaryDisplay();
  // let dimensions = mainScreen.size;
  mainWindow = new BrowserWindow({
    width: 1364,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      allowRunningInsecureContent: !isDev,
      webSecurity: !isDev,
    },
  })

  mainWindow.setMinimumSize(1364, 768)
  mainWindow.loadURL(
    isDev
      ? process.env.NODE_APP_ELECTRON_UI_ENDPOINT
      : url.format({
          pathname: path.join(__dirname, './index.html'),
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
