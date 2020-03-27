import electron from 'electron';
import path from 'path';
import url from 'url';
import 'babel-polyfill';

const app = electron.app;
let mainWindow;

const createWindow = () => {
  mainWindow = new electron.BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    // frame: false
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';