// import { Injectable } from '@angular/core';
import { Injectable, ElementRef } from '@angular/core';
 import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
// import { ExcelJson } from '../interfaces/excel-json.interface';

const EXCEL_EXTENSION = '.xlsx';
const CSV_EXTENSION = '.csv';
const CSV_TYPE = 'text/plain;charset=utf-8';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  }
  public exportToCsv(rows: object[], fileName: string, columns?: string[]): string {
    //rows = quiz.questions;
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]).filter(k => {
      if (columns?.length) {
        return columns.includes(k);
      } else {
        return true;
      }
    });
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');
    this.saveAsFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
  }
}
