import { Component, OnInit, ViewChild } from '@angular/core';
import { CSVRecord } from 'src/app/interfaces/CSVMODEL';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  uploadCSV() {
    console.log(`uploading logic`);
  }

  // public records: any[] = [];
  // @ViewChild('csvReader') csvReader: any;

  // uploadListener($event: any): void {

  //   let files = $event.srcElement.files;

  //   if (this.isValidCSVFile(files[0])) {
  //     let input = $event.target;
  //     let reader = new FileReader();

  //     reader.readAsText(input.files[0]);

  //     // This event is triggered each time the reading operation is successfully completed.
  //     reader.onload = () => {
  //       let csvData = reader.result;
  //       let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
  //       let headersRow = this.getHeaderArray(csvRecordsArray);
  //       this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
  //       console.log(this.records);
  //     };

  //     // This event is triggered each time the reading operation encounter an error.
  //     reader.onerror = () => {
  //       console.log('error is occured while reading file!');
  //     };

  //   } else {
  //     alert("Please import valid .csv file.");
  //     this.fileReset();
  //   }

  // }

  // getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
  //   let csvArr = [];

  //   for (let i = 1; i < csvRecordsArray.length; i++) {
  //     let curruntRecord = (<string>csvRecordsArray[i]).split(',');

  //     if (curruntRecord.length == headerLength) {
  //       let csvRecord: CSVRecord = new CSVRecord();
  //       csvRecord.id = curruntRecord[0].trim();
  //       csvRecord.firstName = curruntRecord[1].trim();
  //       csvRecord.lastName = curruntRecord[2].trim();
  //       csvRecord.age = curruntRecord[3].trim();
  //       csvRecord.position = curruntRecord[4].trim();
  //       csvRecord.mobile = curruntRecord[5].trim();
  //       csvArr.push(csvRecord);
  //     }
  //   }

  //   return csvArr;
  // }

  // isValidCSVFile(file: any) {
  //   return file.name.endsWith(".csv");
  // }

  // getHeaderArray(csvRecordsArr: any) {
  //   let headers = (<string>csvRecordsArr[0]).split(',');
  //   let headerArray = [];
  //   for (let j = 0; j < headers.length; j++) {
  //     headerArray.push(headers[j]);
  //   }
  //   return headerArray;
  // }

  // fileReset() {
  //   this.csvReader.nativeElement.value = "";
  //   this.records = [];
  // }

}
