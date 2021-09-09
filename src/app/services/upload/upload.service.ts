import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private utilityService: UtilityService
  ) {
    this.baseUrl = utilityService.rootApi + "/users";
  }

  uploadCsv(file: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + "/upload", file).pipe(
      catchError(this.utilityService.handleError<any>("uploadCsv"))
    );
  }

}
