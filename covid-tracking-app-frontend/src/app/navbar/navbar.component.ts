import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DoctorService } from '../services/doctor.service';
import { User } from '../models/user';
import { AppComponent } from '../app.component';
import { MapComponent } from '../map/map.component';

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

  public doctorIsLogged(): boolean{
    return DoctorService.loggedDoctorId != null;
  }

  public logout(): void{
      this.userService.logout();
      DoctorService.loggedDoctorId = null;
      DoctorService.doctorOfficesId = null;
      AppComponent.changeToLogin();
  }

  public addOrRemovePatient(): void{ MapComponent.showWorkingPlacesOnly(true); }
  public manageCovidCases(): void { MapComponent.showWorkingPlacesOnly(false); }
  public contactInformation(): void{ AppComponent.changeContactInformation(); }
  public addressInformation(): void{ AppComponent.changeAddressInformation(); } 
  public helpInformation(): void{AppComponent.seeHelpInfo();}

}
