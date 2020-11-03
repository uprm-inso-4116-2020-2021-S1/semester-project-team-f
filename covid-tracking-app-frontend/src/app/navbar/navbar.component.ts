import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DoctorService } from '../services/doctor.service';
import { User } from '../models/user';
import { LoginSidebarComponent } from '../login-sidebar/login-sidebar.component';
import { AppComponent } from '../app.component';
import { Doctor } from '../models/doctor';
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
    document.querySelector('.navbar').classList.add('slide-up') //execute the slide-up effect (this is another way of doing so)
    LoginSidebarComponent.justSignedOut = true;
    setTimeout(() =>  {
      DoctorService.loggedDoctorId = null;
      DoctorService.doctorOfficesId = null;
      MapComponent.hideWorkingPlacesAndShowOffices();
      this.userService.logout()
    }, 800); //wait 800ms for the effect to take effect
  }

  public addOrRemovePatient(): void{ MapComponent.showWorkingPlacesOnly(true); }
  public manageCovidCases(): void { MapComponent.showWorkingPlacesOnly(false); }
  public contactInformation(): void{ AppComponent.changeContactInformation(); }
  public addressInformation(): void{ AppComponent.changeAddressInformation(); } 
  public helpInformation(): void{AppComponent.seeHelpInfo();}

}
