import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AppComponent } from '../app.component';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-login-sidebar',
  templateUrl: './login-sidebar.component.html',
  styleUrls: ['./login-sidebar.component.scss']
})
export class LoginSidebarComponent implements OnInit {

  public effectsInAction: string[]; //effects not related to login
  public canGoToNextPage: boolean;
  public error: string;

  constructor(private userService: UserService, private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.effectsInAction = ["slide-down", "fade-in"]; //the default effects when someone enters to the main-page  
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
        else if(res.message == "Success!"){
          //lets verify if the user is a doctor
          this.doctorService.getDoctorById(res.user.user_id).subscribe(res =>{
            if(res.message == "Success!"){
              DoctorService.loggedDoctorId = res.doctor[0].user_id;
              DoctorService.doctorOfficesId = new Set<number>();

              for (let doctor of res.doctor){
                DoctorService.doctorOfficesId.add(doctor.office_id);
              }

            }
          });

            UserService.loggedUser = res.user;
            localStorage.setItem('currentUserId', res.user.user_id);

            console.log("User with id of " + res.user.user_id + " has logged in!");

            AppComponent.changeToNavbar();
        }
      },
      err => this.error = err.error.reason);
  }
}
