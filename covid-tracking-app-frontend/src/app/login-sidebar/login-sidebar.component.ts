import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login-sidebar',
  templateUrl: './login-sidebar.component.html',
  styleUrls: ['./login-sidebar.component.scss']
})
export class LoginSidebarComponent implements OnInit {

  public effectsInAction: string[]; //effects not related to login
  public canGoToNextPage: boolean;
  public static justSignedOut: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.effectsInAction = ["slide-down", "fade-in"]; //the default effects when someone enters to the main-page

    if(LoginSidebarComponent.justSignedOut){
      document.querySelector('.sidebar').classList.add('slide-right');
    }
    
    this.canGoToNextPage = false;
  }

  public createAccount(): void{

    this.effectsInAction = ["slide-up", "fade-out"]; //after the users press create account, those are the effects that will be executed
    setTimeout(() => this.canGoToNextPage = true, 800);
  }

  public login(): void{
      let email: string = (<HTMLInputElement>document.querySelector("#inputEmail")).value;
      let password: string = (<HTMLInputElement>document.querySelector("#inputPassword")).value;
      this.userService.login(email, password).subscribe(res => {
        if(res.message == "Inactive Account"){
          alert('Account not active. Check Email for activation link.')
          this.userService.sendUserActivation(email).subscribe(res =>{
          });
        }
        if(res.message == "Success!"){
          //execute the slide-left effect (this is another way of doing so)
          document.querySelector('.sidebar').classList.add('slide-left'); 

          setTimeout(() => {
            UserService.loggedUser = res.user;
            localStorage.setItem('currentUserId', res.user.user_id);
            console.log("User with id of " + res.user.user_id + " has logged in!");
            AppComponent.changeToNavbar();
          }, 800);

        }
      })
  }
}
