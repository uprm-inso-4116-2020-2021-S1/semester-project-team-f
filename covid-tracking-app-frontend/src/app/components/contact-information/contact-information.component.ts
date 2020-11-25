import { Component, Input } from '@angular/core';
import { User } from '../../models/user'
import { MessageBoxComponent } from '../message-box/message-box.component';
import { LoginSidebarComponent } from '../login-sidebar/login-sidebar.component';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss']
})
export class ContactInformationComponent{

  @Input() login_component: LoginSidebarComponent;

  public isCreatingAddress: boolean;
  public fadeEffect: string;
  public contact_info: User;

  constructor() { 
    this.initializeUserInfo();
    this.fadeEffect = "fade-in"; //the effect that will be executed as soon as the user enters this component
    this.isCreatingAddress = false;
  }

  public goToPreviousPage(): void{
    this.fadeEffect = "fade-out"; //after the users press go back, this effect will be executed
    
    setTimeout(() => {
      this.login_component.isCreatingAccount = false;
      this.login_component.effectsInAction = ["slide-down", "fade-in"];
    }, 800);
  }

  public goToNextPage(): void{
    this.fadeEffect = "fade-out"; //after the users press go next, this effect that will be executed
    setTimeout(() => this.isCreatingAddress = true, 800);
  }
  
  public setUserInfo(key:string, value:string){
    let validation: boolean = true;

    if(key == 'birthdate'){
      let birthdate = new Date(value);
      let today = new Date();
      if(birthdate > today) { 
        MessageBoxComponent.displayMessageBox("You typed an invalid birthday.");
        (<HTMLInputElement>document.getElementById("birthdate")).value = "";
        validation = false;
       }
    }

    if(key == 'gender_id'){ this.contact_info[key] = Number.parseInt(value); }
    if(validation){ this.contact_info[key] = value; }
    
  }
  
  public getSavedUserInfo(): User{ return this.contact_info; }

  public showDoctorDialog(): void { MessageBoxComponent.displayMessageBox("If you want to sign up as a doctor or any other medical authority, please proceed to create your account as a regular one and then contact our administration at 939-216-6370"); }

  private initializeUserInfo(){
    if(!this.getSavedUserInfo()){
      this.contact_info = {
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
