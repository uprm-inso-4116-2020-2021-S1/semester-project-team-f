import { Component, OnInit, Type } from '@angular/core';
import { AppComponent } from '../app.component';
import { MedicalOffice } from '../models/medical_office';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor.service';

type EmployeeRecord = Doctor & User;

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss']
})

export class ManageEmployeesComponent implements OnInit {

  static medical_office: MedicalOffice
  employees: EmployeeRecord[]
  error: string;
  
  constructor(private doctorService: DoctorService, private userService: UserService) { }

  ngOnInit(): void {
      this.showPatients();
   }

   public showPatients(): void{
    this.employees = [];

    this.doctorService.getDoctorsByOfficeId(ManageEmployeesComponent.medical_office.office_id).subscribe(employee_repsonse => {
      for (let i = 0; i < employee_repsonse.doctors.length; i++){
          let employee: Doctor = employee_repsonse.doctors[i];

          this.userService.getUserByIdOrEmail(employee.user_id).subscribe(user_response => {
            let user: User = user_response.user;

            let employee_to_add: EmployeeRecord = {
              user_id: user.user_id,
              gender_id: user.gender_id,
              address_id:  user.address_id,
              full_name: user.full_name,
              birthdate: user.birthdate,
              phone_number: user.phone_number,
              email: user.email,
              office_id: employee.office_id,
              registered_date: employee.registered_date,
            }

            this.employees.push(employee_to_add);
          });
      }
    });
   }

   public searchEmployee(): boolean{
     document.getElementById(this.employees[0].user_id).classList.remove("active");
     let email: string = (<HTMLInputElement>document.querySelector("#inputEmail")).value;
     for(let i = 0; i < this.employees.length; i++){
       let patient : EmployeeRecord = this.employees[i];
        if(patient.email == email){
          this.employees.splice(i,1);
          this.employees.unshift(patient);
          this.error = null;
          document.getElementById(this.employees[0].user_id).classList.add("active");
          return true;
        }
     }
     this.error = "Email is not registered in this office.";
     return false;
   }

  public returnToNavbar(): void{
    ManageEmployeesComponent.medical_office = null; 
    AppComponent.exitManagingEmployees();
  }

  public getOffice(): MedicalOffice{
    return ManageEmployeesComponent.medical_office;
  }

  public deleteEmployee(employee: EmployeeRecord){
    if(employee.user_id == UserService.loggedUser.user_id){
      this.error = "You can't delete your own self..."
      return;
    }

    this.doctorService.deleteDoctor(employee.office_id, employee.user_id).subscribe(res =>{
      if(res.message == "Success!"){
        console.log("The following doctor record was deleted: ");
        console.log(employee);
        let index = this.employees.indexOf(employee);
        this.employees.splice(index, 1);
        this.error = null;
      }
    }, err => this.error = err.error.reason);
  }

  public addEmployee(){
    let email = (<HTMLInputElement>document.querySelector('#inputEmail')).value;
    this.userService.getUserByIdOrEmail(email).subscribe(user_response => {
      if(user_response.message == "Success!"){
        this.error = null;

        let date = new Date();

        let employee: Doctor = {
          user_id: user_response.user.user_id,
          office_id: ManageEmployeesComponent.medical_office.office_id,
          registered_date: date.toDateString()
        }
        this.doctorService.createDoctor(employee).subscribe(employees_response => {
            if(employees_response.message == "Success!"){
              let user: User = user_response.user;

              let employee_to_add: EmployeeRecord = {
                user_id: user.user_id,
                gender_id: user.gender_id,
                address_id:  user.address_id,
                full_name: user.full_name,
                birthdate: user.birthdate,
                phone_number: user.phone_number,
                email: user.email,
                office_id: employee.office_id,
                registered_date: employee.registered_date,
              }
  
              this.employees.push(employee_to_add);
            }
        });
      }
    }, err => this.error = "Email does not exist. Make sure that the doctor registers as a regular user first.");
  }
}



