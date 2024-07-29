const sql = require('mssql');
const { app, BrowserWindow, dialog, protocol  } = require('electron');
// auto updater
const { autoUpdater } = require('electron-updater');
require('dotenv').config()
let mainWindow;
const os = require('os');
const path = require('path'); // Voeg deze regel toe
const url = require('url');
const fs = require('fs');
const XLSX = require('xlsx');

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false, // Only for development!
      allowRunningInsecureContent: true // Only for development!
    },
    icon: __dirname + '/dist/sync/assets/icon.ico',
  });
  mainWindow.webContents.openDevTools()
  mainWindow.maximize();
  // mainWindow.loadFile('dist/sync/index.html')

  const syncPath = path.join(__dirname, 'dist', 'sync', 'index.html');
  mainWindow.loadFile(`${syncPath}`);

  // Path to the Excel file
  const filePath = path.join(__dirname, 'src/assets/Exercises.xlsm');

  // Read the Excel file
  const workbook = XLSX.readFile(filePath);

  const exercisesSheetName = 'Oefeningen';
  const tagsSheetName = 'Tags';

  const exercisesWorksheet = workbook.Sheets[exercisesSheetName];
  const tagsWorksheet = workbook.Sheets[tagsSheetName];

  const exercisesData = XLSX.utils.sheet_to_json(exercisesWorksheet, { header: 1 });
  const tagsData = XLSX.utils.sheet_to_json(tagsWorksheet, { header: 1 });

  // Send data to the renderer process
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('excel-data', {
      exercises: exercisesData.slice(1).map(row => ({
        name: row[0] || '',
        tags: row[1] || '',
        link: row[2] || ''
      })),
      tags: tagsData.map(row => row[0] || '')
    });
  });
}



const { ipcMain } = require('electron');

const updateApp = () => {
  autoUpdater.checkForUpdatesAndNotify().then(result => {
    if(result?.updateInfo?.version !== app.getVersion()) {
      autoUpdater.downloadUpdate().then((r) => {
        autoUpdater.quitAndInstall();
      }).catch(err => {
        dialog.showMessageBox(mainWindow, {
          type: 'error',
          title: 'Update Failed',
          message: 'Could not download the update. Please check your internet connection and try again.',
          detail: `Error details: ${err.message}`,
        });
      });
    }
  }).catch(err => {
    dialog.showMessageBox(mainWindow, {
      type: 'error',
      title: 'Update Failed',
      message: 'Could not download the update. Please check your internet connection and try again.',
      detail: `Error details: ${err.message}`,
    });
  })
}

ipcMain.on('exit-app', (event) => {
    app.quit();
});

app.whenReady().then(() => {
    createWindow();
    // updateApp();
    // connectToDatabase();
      // Read the Excel file and send the data to the renderer process

  });


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
    }
);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
