import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(public userService: UserService) { }
  ngOnInit(): void {}

  public getLoggedInUser(): User{
    return UserService.loggedUser;
  }

  public ReturntoNav(): void{
    document.querySelector('.sidebar').classList.add('slide-left'); 
    AppComponent.changeToNavbar();
  }
  
}
