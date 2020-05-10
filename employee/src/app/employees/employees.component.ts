import { Component, OnInit } from '@angular/core';

import { EmployeeService} from '../employee.service';
import { Employee } from '../employees/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {
  employees:Employee[] = [];
  employee:Employee;
  name: string;
  position: string;
  office: string;
  salary: number
  selectedEmployee:Employee;
  toggleForm: boolean = false;

  constructor(private employeeService: EmployeeService) { }

  addnew() {
    const newEmployee = {
      name:this.name,
      position: this.position,
      office: this.office,
      salary: this.salary
    }
    this.employeeService.addnew(newEmployee)
    
    .subscribe( employees => {
      this.employees.push(this.employee);
      console.log(newEmployee)
    })
  }


  editItem(form) {
    const newEmployee = {
      _id:this.selectedEmployee._id,
      name:this.selectedEmployee.name,
      position: this.selectedEmployee.position,
      office: this.selectedEmployee.office,
      salary: this.selectedEmployee.salary
    }
    this.employeeService.updateEmployee(newEmployee).subscribe( employees => {
      this.employees.push(this.employee);
      console.log(newEmployee);
    })
  }

  showEditForm(employee) {
    this.selectedEmployee=employee;
    this.toggleForm=!this.toggleForm;
    console.log(employee)
}

    


  ngOnInit(): void {
    this.employeeService.getEmployeeList()
    .subscribe ( employees =>
      this.employees=employees);
  }


  
  

  deleteEmployee(id:any) {
    var employees = this.employees
    this.employeeService.deleteEmployee(id)
    .subscribe(data=>{
      if(data = 1)
      {
        for(var i = 0; i < employees.length; i++)
        {
          if(employees[i]._id == id)
          {
            employees.splice(i,1);
          }
        }
      }
    })
  }
}
