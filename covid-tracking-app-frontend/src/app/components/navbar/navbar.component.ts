import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DoctorService } from '../../services/doctor.service';
import { User } from '../../models/user';
import { AppComponent } from '../../app.component';
import { MapComponent } from '../map/map.component';
import { MedicalOffice } from '../../models/medical_office';
import { PatientService } from '../../services/patient.service';
import { WorkingOffice } from '../../interfaces/WorkingOffice'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() parent: AppComponent;
  @Input() map: MapComponent;

  constructor(public userService: UserService) { }

  ngOnInit(): void {}

  public getLoggedInUser(): User{ return UserService.loggedUser;}

  public doctorIsLogged(): boolean{ return DoctorService.doctorWorkingOfficesId.size != 0; }
  public patientIsLogged(): boolean{ return PatientService.patientAttendedOfficesId.size != 0; }

  public hasMedicalOffices(): boolean { return UserService.userOwnedOfficesId.size != 0;}

  public logout(): void{
    this.map.removeVisitedLocations();
    this.map.showMedicalOffices();
    this.userService.logout();

    DoctorService.doctorWorkingOfficesId = null;
    PatientService.patientAttendedOfficesId = null;

    AppComponent.changeToLogin();
  }

  public addVisitedLocations(): void{ this.map.addVisitedLocation();}
  public toggleVisitedLocations(): void{ this.map.toggleVisitedLocations();}

  public managePatients(): void{
    let working_office: WorkingOffice = {
      satisfyCondition: (medical_office: MedicalOffice): boolean => {
        return DoctorService.doctorWorkingOfficesId.has(medical_office.office_id);
      },

      doAction: (medical_office: MedicalOffice): void => {
        this.parent.selected_office = medical_office;
        AppComponent.changeManagePatients();
      }
    }

    this.map.showWorkingOfficesUnderCondition(working_office);
  }

  public manageCovidCases(): void {
    let working_office: WorkingOffice = {
      satisfyCondition: (medical_office: MedicalOffice): boolean => {
        return DoctorService.doctorWorkingOfficesId.has(medical_office.office_id);
      },

      doAction: (medical_office: MedicalOffice): void => {
        this.parent.selected_office = medical_office;
        AppComponent.changeManagingCovidCases();
      }
    }

      this.map.showWorkingOfficesUnderCondition(working_office); 
  }
  public manageEmployees(): void {
    let working_office: WorkingOffice = {
      satisfyCondition: (medical_office: MedicalOffice): boolean => {
        return UserService.userOwnedOfficesId.has(medical_office.office_id);
      },

      doAction: (medical_office: MedicalOffice): void => {
        this.parent.selected_office = medical_office; 
        AppComponent.changeManagingEmployees();
      }
    }

      this.map.showWorkingOfficesUnderCondition(working_office); 
    }

  public viewCovidTests(): void{ AppComponent.changeViewPrevCovidTests(); }
  public contactInformation(): void{ AppComponent.changeContactInformation(); }
  public addressInformation(): void{ AppComponent.changeAddressInformation(); } 
  public helpInformation(): void{AppComponent.seeHelpInfo();}

}
