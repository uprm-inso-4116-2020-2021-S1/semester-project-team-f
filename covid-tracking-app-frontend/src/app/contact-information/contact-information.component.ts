import { Component } from '@angular/core';
import { User } from '../models/user'

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss']
})
export class ContactInformationComponent{

  public canGoToPreviousPage: boolean;
  public canGoToNextPage: boolean;
  public fadeEffect: string;
  public static contact_info: User;

  constructor() { 
    this.initializeUserInfo();
    this.fadeEffect = "fade-in"; //the effect that will be executed as soon as the user enters this component
    this.canGoToPreviousPage = false;
    this.canGoToNextPage = false;
  }

  public goToPreviousPage(): void{
    this.fadeEffect = "fade-out"; //after the users press go back, this effect will be executed
    setTimeout(() => this.canGoToPreviousPage = true, 800);
  }

  public goToNextPage(): void{
    this.fadeEffect = "fade-out"; //after the users press go next, this effect that will be executed
    setTimeout(() => this.canGoToNextPage = true, 800);
  }
  
  public setUserInfo(key:string, value:string){
    if(key == 'gender_id'){ ContactInformationComponent.contact_info[key] = Number.parseInt(value); }
    else{ ContactInformationComponent.contact_info[key] = value; }
  }
  
  public getSavedUserInfo(): User{
    return ContactInformationComponent.contact_info;
  }

  private initializeUserInfo(){
    if(!this.getSavedUserInfo()){
      ContactInformationComponent.contact_info = {
        user_id: '',
        gender_id: null,
        address_id: null,
        full_name: '',
        birthdate: null,
        phone_number: '',
        email: '',
        password: ''
      }
    }
  }
}
