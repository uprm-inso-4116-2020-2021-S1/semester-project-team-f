import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { LoginSidebarComponent } from '../login-sidebar/login-sidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  public getLoggedInUser(): User{
    return UserService.loggedUser;
  }

  public logout(): void{
    document.querySelector('.navbar').classList.add('slide-up') //execute the slide-up effect (this is another way of doing so)
    LoginSidebarComponent.justSignedOut = true;
    setTimeout(() =>  this.userService.logout(), 800); //wait 800ms for the effect to take effect
  }

}
