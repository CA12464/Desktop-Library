// electron/preload.js

import { contextBridge, ipcRenderer } from 'electron';
import { BookData } from '../src/types';

contextBridge.exposeInMainWorld('api', {
  sendBookData: (bookData: BookData) => ipcRenderer.invoke('sendBookData', bookData),
});



