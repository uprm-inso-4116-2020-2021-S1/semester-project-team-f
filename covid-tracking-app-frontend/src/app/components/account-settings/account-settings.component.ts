import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AppComponent } from '../../app.component';
import { MessageBoxComponent } from '../message-box/message-box.component';

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

  public updateContactInfo(): void{
    //WARNING: we need to validate those parameters before updating them...
    
    UserService.loggedUser.email = (<HTMLInputElement>document.querySelector("#email")).value;
    UserService.loggedUser.phone_number = (<HTMLInputElement>document.querySelector("#phone_number")).value;

    let curr_password_validation = (<HTMLInputElement>document.querySelector("#curr_password")).value;

    if(curr_password_validation == UserService.loggedUser.password){
      UserService.loggedUser.password = (<HTMLInputElement>document.querySelector("#new_password")).value;
    }

    this.userService.updateContactInfo(UserService.loggedUser).subscribe(res => {
      if(res.message == 'Success!'){
        MessageBoxComponent.displayMessageBox('Contact information successfully updated!');
        this.returnToNavbar();
      }
    })

  }

  public returnToNavbar(): void{ setTimeout(() => { AppComponent.exitContactInformation(); }, 800); }
  
}
