import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Employee } from './employees/employee';
import 'rxjs/Rx';


//var urlencodedParser = bodyParser.urlencoded({ extended: false });




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee:Employee;
 
  constructor(private http: HttpClient) { }

  addnew(newEmployee){ 
    var headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/employees', newEmployee,{headers:headers});
    
}

  getEmployeeList() {
    return this.http.get<Employee[]>('http://localhost:3000/employee');
  }



deleteEmployee(id){

  return this.http.delete('http://localhost:3000/employee/' + id);
 }

 getEmployee(id){
   return this.http.get<Employee>('http://localhost:3000/employee' + id);
 }
 
 updateEmployee(newEmployee){
  var headers = new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.put('http://localhost:3000/employee/' + newEmployee._id, newEmployee, {headers:headers});
  

 }

}