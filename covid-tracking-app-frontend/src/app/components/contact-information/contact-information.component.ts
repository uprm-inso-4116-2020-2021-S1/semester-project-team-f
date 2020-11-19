import { Component } from '@angular/core';
<<<<<<< HEAD:covid-tracking-app-frontend/src/app/contact-information/contact-information.component.ts
import { User } from '../models/user'
=======
import { User } from '../../models/user'
import { MessageBoxComponent } from '../message-box/message-box.component';
>>>>>>> 11a2f4a9ecde10cf56db40dd75f47540ffd1171e:covid-tracking-app-frontend/src/app/components/contact-information/contact-information.component.ts

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

  public showDoctorDialog(): void { MessageBoxComponent.displayMessageBox("If you want to sign up as a doctor or any other medical authority, please proceed to create your account as a regular one and then contact our administration at 939-216-6370"); }

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
        password: '',
        active: false
      }
    }
  }
}
