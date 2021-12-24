import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  public rootApi = "http://localhost:3000";

  constructor() { }

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occurred: " + error.error;
    } else {
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`;
    }

    console.error(errorMessage);

    if (error.error.message !== null && error.error.message !== undefined) {
      return throwError(error.error.message);
    }

    return throwError(errorMessage);
  }

}
