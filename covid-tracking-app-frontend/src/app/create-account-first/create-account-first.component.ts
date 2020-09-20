import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account-first',
  templateUrl: './create-account-first.component.html',
  styleUrls: ['./create-account-first.component.scss']
})
export class CreateAccountFirstComponent implements OnInit {

  canGoToPreviousPage: boolean;
  canGoToNextPage: boolean;
  fadeEffect: string;

  constructor() { 
    this.fadeEffect = "fade-in"; //the effect that will be executed as soon as the user enters this component
    this.canGoToPreviousPage = false;
    this.canGoToNextPage = false;
  }

  ngOnInit(): void {

  }

  public goToPreviousPage(): void{

    this.fadeEffect = "fade-out"; //after the users press go back, this effect will be executed

    let timeLeft:number= 180;

    setInterval(() => {
      if(timeLeft > 0) { timeLeft--; } 
      else { this.canGoToPreviousPage = true; }
    })

  }

  public goToNextPage(): void{

    this.fadeEffect = "fade-out"; //after the users press go next, this effect that will be executed

    let timeLeft:number= 180;

    setInterval(() => {
      if(timeLeft > 0) { timeLeft--; } 
      else { this.canGoToNextPage = true; }
    })

  }
  

}
