import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DoctorService } from '../services/doctor.service';
import { User } from '../models/user';
import { AppComponent } from '../app.component';
import { MapComponent } from '../map/map.component';
import { ManagePatientsComponent } from '../manage-patients/manage-patients.component';
import { ManageEmployeesComponent } from '../manage-employees/manage-employees.component';
import { MedicalOffice } from '../models/medical_office';
import { ManageCovidCasesComponent } from '../manage-covid-cases/manage-covid-cases.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {}

  public getLoggedInUser(): User{
    return UserService.loggedUser;
  }

  public doctorIsLogged(): boolean{ return DoctorService.doctorWorkingOfficesId != null; }

  public hasMedicalOffices(): boolean { return UserService.userOwnedOfficesId.size != 0;}

  public logout(): void{
      this.userService.logout();
      DoctorService.doctorWorkingOfficesId = null;
      AppComponent.changeToLogin();
  }

  public addOrRemovePatient(): void{
    MapComponent.showWorkingPlacesOnly((medical_office: MedicalOffice): boolean => {
      return DoctorService.doctorWorkingOfficesId.has(medical_office.office_id) 
    },
    (medical_office) => {
      ManagePatientsComponent.medical_office = medical_office;
      AppComponent.changeAddOrRemovePatients();
    });
  }

  public manageCovidCases(): void {
    MapComponent.showWorkingPlacesOnly((medical_office: MedicalOffice): boolean => {
      return DoctorService.doctorWorkingOfficesId.has(medical_office.office_id) 
    },
    (medical_office) => { 
      ManageCovidCasesComponent.medical_office = medical_office; 
      AppComponent.changeManagingCovidCases();
     }); 
  }
  public manageEmployees(): void {
    MapComponent.showWorkingPlacesOnly((medical_office: MedicalOffice): boolean => {
      return UserService.userOwnedOfficesId.has(medical_office.office_id) 
    },
    (medical_office) => { 
      ManageEmployeesComponent.medical_office = medical_office; 
      AppComponent.changeManagingEmployees();
     }); 
    }

  public contactInformation(): void{ AppComponent.changeContactInformation(); }
  public addressInformation(): void{ AppComponent.changeAddressInformation(); } 
  public helpInformation(): void{AppComponent.seeHelpInfo();}

}
