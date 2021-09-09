import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public currentCsvFile: any;
  public uploading: boolean = false;
  public rspSuccessStatus: boolean;
  public rspFailStatus: string;

  // in case need to reset element
  @ViewChild('csvReader') csvReader: any;

  constructor(
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
  }

  csvFileListener($event: any): void {
    let file = $event.target.files.item(0);

    if (this.isValidCSVFile(file)) {
      // reset ui
      this.rspSuccessStatus = false;
      this.rspFailStatus = null;

      this.currentCsvFile = file;
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  upload() {
    this.rspSuccessStatus = false;
    this.rspFailStatus = null;
    this.uploading = true;

    const uploadedFile = new FormData();
    uploadedFile.append('file', new Blob([this.currentCsvFile], { type: 'text/csv' }), this.currentCsvFile.name);

    this.uploadService.uploadCsv(uploadedFile).subscribe(
      rsp => {
        if (rsp) { // check if error detected; no error would mean null rsp
          if (rsp.error) {
            this.rspFailStatus = rsp.error.message;
          }
        } else {
          this.rspSuccessStatus = true;
        }

        this.uploading = false;
      },
      err => {
        console.error(err);
        this.uploading = false;
      }
    );
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
  }

}
