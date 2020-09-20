import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-sidebar',
  templateUrl: './login-sidebar.component.html',
  styleUrls: ['./login-sidebar.component.scss']
})
export class LoginSidebarComponent implements OnInit {

  effectsInAction: string[];
  canGoToNextPage: boolean;

  constructor() { }

  ngOnInit(): void {
    this.effectsInAction = ["slide-down", "fade-in"]; //the default effects when someone enters to the main-page
    this.canGoToNextPage = false;
  }

  public createAccount(): void{

    this.effectsInAction = ["slide-up", "fade-out"]; //after the users press create account, those are the effects that will be executed

    let timeLeft:number= 180;

    setInterval(() => {
      if(timeLeft > 0) { timeLeft--; } 
      else { this.canGoToNextPage = true; }
    })

  }


  




}
