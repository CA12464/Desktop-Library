import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { BookData } from '../src/types'; // Adjust the path as needed

// Get the directory name from the current file URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to handle IPC messages without using the event parameter
ipcMain.handle('sendBookData', async (_event, bookData: BookData) => {
  console.log('Book Data:', bookData); // Process the bookData here
  return bookData; // Return data or any other result you want to send back
});

// Function to create the main window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000' // URL for Vite's dev server
      : `file://${path.join(__dirname, 'dist/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// App ready event
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}).catch((error) => {
  console.error('Error during app initialization:', error);
});

// Window-all-closed event
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
