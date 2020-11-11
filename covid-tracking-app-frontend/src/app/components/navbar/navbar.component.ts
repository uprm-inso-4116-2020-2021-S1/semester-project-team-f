import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DoctorService } from '../../services/doctor.service';
import { User } from '../../models/user';
import { AppComponent } from '../../app.component';
import { MapComponent } from '../map/map.component';
import { MedicalOffice } from '../../models/medical_office';
import { PatientService } from '../../services/patient.service';

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

  public getLoggedInUser(): User{
    return UserService.loggedUser;
  }

  public doctorIsLogged(): boolean{ return DoctorService.doctorWorkingOfficesId.size != 0; }
  public patientIsLogged(): boolean{ return PatientService.patientAttendedOfficesId.size != 0; }

  public hasMedicalOffices(): boolean { return UserService.userOwnedOfficesId.size != 0;}

  public logout(): void{
      this.userService.logout();

      DoctorService.doctorWorkingOfficesId = null;
      PatientService.patientAttendedOfficesId = null;

      AppComponent.changeToLogin();
  }

  public addOrRemovePatient(): void{
      this.map.showWorkingPlacesOnly((medical_office: MedicalOffice): boolean => {
      return DoctorService.doctorWorkingOfficesId.has(medical_office.office_id) 
    },
    (medical_office) => {
      this.parent.selected_office = medical_office;
      AppComponent.changeAddOrRemovePatients();
    });
  }

  public addVisitedLocations(): void{ this.map.addVisitedLocation();}
  public showVisitedLocations(bool: boolean): void{ this.map.showVisitedLocation(bool);}

  public manageCovidCases(): void {
      this.map.showWorkingPlacesOnly((medical_office: MedicalOffice): boolean => {
      return DoctorService.doctorWorkingOfficesId.has(medical_office.office_id) 
    },
    (medical_office) => { 
      this.parent.selected_office = medical_office; 
      AppComponent.changeManagingCovidCases();
     }); 
  }
  public manageEmployees(): void {
      this.map.showWorkingPlacesOnly((medical_office: MedicalOffice): boolean => {
      return UserService.userOwnedOfficesId.has(medical_office.office_id) 
    },
    (medical_office) => { 
      this.parent.selected_office = medical_office; 
      AppComponent.changeManagingEmployees();
     }); 
    }

  public viewCovidTests(): void{ AppComponent.changeViewPrevCovidTests(); }
  public contactInformation(): void{ AppComponent.changeContactInformation(); }
  public addressInformation(): void{ AppComponent.changeAddressInformation(); } 
  public helpInformation(): void{AppComponent.seeHelpInfo();}

}
