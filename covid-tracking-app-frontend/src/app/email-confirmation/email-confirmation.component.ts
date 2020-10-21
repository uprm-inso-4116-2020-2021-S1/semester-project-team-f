import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent{

  
  public canGoToNextPage: boolean;
  public fadeEffect: string;
  public static contact_info: User;

  constructor(private userService: UserService) { 
    this.initializeUserInfo();
    this.fadeEffect = "fade-in"; //the effect that will be executed as soon as the user enters this component
    
    this.canGoToNextPage = false;
  }
  

  

  public goToNextPage(): void{
    this.fadeEffect = "fade-out"; //after the users press go next, this effect that will be executed
    setTimeout(() => this.canGoToNextPage = true, 800);
  }
  
  public setUserInfo(key:string, value:string){
    if(key == 'gender_id'){ EmailConfirmationComponent.contact_info[key] = Number.parseInt(value); }
    else{ EmailConfirmationComponent.contact_info[key] = value; }
  }
  
  public getSavedUserInfo(): User{
    return EmailConfirmationComponent.contact_info;
  }
  public sendEmail(): void{
    
  }

  private initializeUserInfo(){
    if(!this.getSavedUserInfo()){
      EmailConfirmationComponent.contact_info = {
        user_id: '',
        gender_id: null,
        address_id: null,
        full_name: '',
        birthdate: null,
        phone_number: '',
        email: '',
        password: '',
        active: null
      }
    }
  }
  public emailConfirm(): void{
    this.canGoToNextPage = true
  }
}
