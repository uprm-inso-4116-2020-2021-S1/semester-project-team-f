import { Component } from '@angular/core';
import { COUNTRIES, STATES } from 'src/config';
import { Address } from '../../models/address';
import { AddressService } from '../../services/address.service';
import { UserService } from '../../services/user.service';
import { AppComponent } from '../../app.component';
import { ContactInformationComponent } from '../contact-information/contact-information.component';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-address-information',
  templateUrl: './address-information.component.html',
  styleUrls: ['./address-information.component.scss']
})
export class AddressInformationComponent{

  
  canGoToNextPage: boolean;
  canGoToPreviousPage: boolean;
  fadeEffect1: string;
  fadeEffect2: string;
  countries: string[];
  states: string[];

  static address_info: Address;

  constructor(private addressService: AddressService, private userService: UserService) { 
    this.fadeEffect1 = "";
    this.fadeEffect2 = "fade-in"; //the effect that will be executed as soon as the user enters this component
    this.initializeAddressInfo();
    this.countries = COUNTRIES;
    this.states = STATES;
    this.canGoToPreviousPage = false;
    this.canGoToNextPage = false;
  }

  public goToPreviousPage(): void{
    if(this.isLoggedIn()){
      this.returnToNavbar();
    }
    else{
      this.fadeEffect2 = "fade-out"; //after the users press go back, this effect will be executed
      setTimeout(() => this.canGoToPreviousPage = true, 800);
    }
  }
  public goToNextPage(): void{
    this.fadeEffect2 = "fade-out"; //after the users press go next, this effect that will be executed
    setTimeout(() => this.canGoToNextPage = true, 800);
  }
  public setAddressInfo(key:string, value:string){
      AddressInformationComponent.address_info[key] = value;
  }

  public getSavedAddressInfo(): Address{
    return AddressInformationComponent.address_info;
  }

  public isLoggedIn():boolean{ return UserService.loggedUser != null; }

  private initializeAddressInfo(){
    if(!this.isLoggedIn() && !this.getSavedAddressInfo()){
      AddressInformationComponent.address_info = {
        country_name: '',
        region_name: '',
        street_address: '',
        city_name: '',
        zip_code: null
      }
    }
    else if(this.isLoggedIn()){
      this.fadeEffect1 = "slide-right";
      this.addressService.getAddressById(UserService.loggedUser.address_id).subscribe(res => {
        if(res.message == "Success!"){
          AddressInformationComponent.address_info = res.address;
        }
      });
    }
  }

  public updateAddress(): void{
    let newAddress = AddressInformationComponent.address_info;
    this.addressService.createAddress(newAddress).subscribe(res => {
          if(res.message == "Success!"){
              this.userService.updateContactInfo(UserService.loggedUser).subscribe(res => {
                if(res.message == "Success!"){
                  UserService.loggedUser.address_id = res.address_id;
                  MessageBoxComponent.displayMessageBox('Address information successfully updated!');
                }else{
                  MessageBoxComponent.displayMessageBox("Couldn't update address");
                }
              });


              this.returnToNavbar();
          }
        },
        err => alert(err.error.reason));
      
  }

  public signUp(): void{
    let newAddress = AddressInformationComponent.address_info;
    let newUser = ContactInformationComponent.contact_info;
    this.addressService.createAddress(newAddress).subscribe(res => {

        let address_id = res.address.address_id; 
        newUser.address_id = address_id;
        this.userService.createUser(newUser).subscribe(res => {
          
          if(res.message == "Success!"){
            this.userService.sendUserActivation(newUser.email).subscribe(res =>{
              this.fadeEffect2 = "fade-out"; //after the users press go next, this effect that will be executed
              setTimeout(() => this.canGoToNextPage = true, 800);
              MessageBoxComponent.displayMessageBox('Sign up was successful! Activate your account using the link we sent to your email.')
            },
            err => alert(err.error.reason)
            );
            
          }

        });
      
    });
  }

  public returnToNavbar(): void{ AppComponent.exitAddressInformation(); }
}
