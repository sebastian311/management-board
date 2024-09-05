import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';
// import { environment } from '../../../../environment/environment'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<{ data: EmployeeModel[]}> {
    return this.http.get<{ data: EmployeeModel[]}>(`http://localhost:3000/employees`);
  }
}
