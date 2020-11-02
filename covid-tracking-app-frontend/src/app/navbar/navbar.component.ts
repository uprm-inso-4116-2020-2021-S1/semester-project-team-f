import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DoctorService } from '../services/doctor.service';
import { User } from '../models/user';
import { LoginSidebarComponent } from '../login-sidebar/login-sidebar.component';
import { AppComponent } from '../app.component';
import { Doctor } from '../models/doctor';

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

  public getLoggedInDoctor(): Doctor{
    return DoctorService.loggedDoctor;
  }

  public logout(): void{
    document.querySelector('.navbar').classList.add('slide-up') //execute the slide-up effect (this is another way of doing so)
    LoginSidebarComponent.justSignedOut = true;
    setTimeout(() =>  {
      DoctorService.loggedDoctor = null;
      this.userService.logout()
    }, 800); //wait 800ms for the effect to take effect
  }

  public addOrRemovePatient(): void{ AppComponent.changeAddRemovePatients(); }
  public patientInformation(): void{ AppComponent.changePatientInformation(); }
  public contactInformation(): void{ AppComponent.changeContactInformation(); }
  public addressInformation(): void{ AppComponent.changeAddressInformation(); } 
  public helpInformation(): void{AppComponent.seeHelpInfo();}

}
