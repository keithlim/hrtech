import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from 'src/app/interfaces/employee';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private utilityService: UtilityService
  ) {
    this.baseUrl = utilityService.rootApi + "/users";
  }

  getEmployees(minSalary, maxSalary): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}?minSalary=${minSalary}&maxSalary=${maxSalary}&offset=${0}&limit=${30}&sort=%2Bid`).pipe(
      catchError(this.utilityService.handleError<any>("getEmployees()"))
    )
  }

  getMoreEmployees(minSalary, maxSalary, offsetVal): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}?minSalary=${minSalary}&maxSalary=${maxSalary}&offset=${offsetVal}&limit=${30}&sort=%2Bid`).pipe(
      catchError(this.utilityService.handleError<any>("getEmployees()"))
    )
  }

}
