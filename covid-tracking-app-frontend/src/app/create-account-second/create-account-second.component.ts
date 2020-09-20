import { Component, OnInit } from '@angular/core';
import { COUNTRIES, STATES } from 'src/config';

@Component({
  selector: 'app-create-account-second',
  templateUrl: './create-account-second.component.html',
  styleUrls: ['./create-account-second.component.scss']
})
export class CreateAccountSecondComponent implements OnInit {

  canGoToPreviousPage: boolean;
  fadeEffect: string;
  countries: string[];
  states: string[];

  selectedCountry: string; //to be modeled as part of the address object soon

  constructor() { 
    this.fadeEffect = "fade-in"; //the effect that will be executed as soon as the user enters this component
    this.countries = COUNTRIES;
    //this.states = STATES;
    this.canGoToPreviousPage = false;
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

}
