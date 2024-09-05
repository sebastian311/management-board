import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '@data-access';
import { pipe, take } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Management';
  
  constructor(private serv: EmployeeService) {}

  ngOnInit(): void {
    this.serv.getEmployees().pipe(take(1)).subscribe( res => console.log(res) )
  }
}
