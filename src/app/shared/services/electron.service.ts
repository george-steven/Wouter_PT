import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
declare global {
  interface Window {
    require: any;
  }
}

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  checkForUpdates(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('update-available', (event: any, result: boolean) => {
        resolve(result);
      });

      ipcRenderer.send('check-for-updates');
    });
  }

  constructor() { }

  private transformData(data: any[][]): { name: string, tags: string, link: string }[] {
    return data.slice(1).map(row => ({
      name: row[0] || '',
      tags: row[1] || '',
      link: row[2] || ''
    }));
  }

  // readExcelFile(file: File): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const data = new Uint8Array(e.target.result);
  //       const workbook = XLSX.read(data, { type: 'array' });

  //       const firstSheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[firstSheetName];
  //       const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  //       resolve(jsonData);
  //     };
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsArrayBuffer(file);
  //   });
  // }

  exitApp() {
    ipcRenderer.send('exit-app');
  }
}

