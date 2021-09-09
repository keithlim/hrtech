import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public minSalary: number;
  public maxSalary: number;
  private retrieveCount: number; // to track how many times GET api called
  public showLoadMoreBtn: boolean;

  public employees: Employee[] = [];
  public dataSource: MatTableDataSource<Employee>;

  public displayedColumns: string[] = ['id', 'login', 'name', 'salary'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private employeeService: EmployeeService
  ) {
    this.dataSource = new MatTableDataSource(this.employees)
  }

  ngOnInit(): void {
  }

  loadEmployees() {
    this.employeeService.getEmployees(this.minSalary, this.maxSalary).subscribe(
      rsp => {
        if (!rsp.error) {
          this.retrieveCount = 1;
          this.showLoadMoreBtn = false;

          this.employees = rsp.results;
          this.adjustDataSource();
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPageDetails(event: PageEvent) {
    if (event.pageIndex === this.paginator.getNumberOfPages() - 1 && this.employees.length === (this.retrieveCount * 30)) {
      this.showLoadMoreBtn = true;
    }
  }

  loadMore() {
    this.employeeService.getMoreEmployees(this.minSalary, this.maxSalary, this.retrieveCount * 30).subscribe(
      rsp => {
        if (!rsp.error) {
          this.retrieveCount++;
          this.showLoadMoreBtn = false;

          this.employees = this.employees.concat(rsp.results);
          this.adjustDataSource();
        }

      },
      err => {
        console.error(err);
      }
    );
  }

  private adjustDataSource() {
    this.dataSource = new MatTableDataSource(this.employees)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
