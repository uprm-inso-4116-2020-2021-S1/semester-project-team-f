import { Component } from '@angular/core';
import { COUNTRIES, STATES } from 'src/config';
import { Address } from '../models/address';
import { AddressService } from '../services/address.service';
import { UserService } from '../services/user.service';
import { AppComponent } from '../app.component';
import { ContactInformationComponent } from '../contact-information/contact-information.component';

@Component({
  selector: 'app-address-information',
  templateUrl: './address-information.component.html',
  styleUrls: ['./address-information.component.scss']
})
export class AddressInformationComponent{

  canGoToPreviousPage: boolean;
  fadeEffect: string;
  countries: string[];
  states: string[];

  static address_info: Address;

  constructor(private addressService: AddressService, private userService: UserService) { 
    this.initializeAddressInfo();
    this.fadeEffect = "fade-in"; //the effect that will be executed as soon as the user enters this component
    this.countries = COUNTRIES;
    this.states = STATES;
    this.canGoToPreviousPage = false;
  }

  public goToPreviousPage(): void{
    this.fadeEffect = "fade-out"; //after the users press go back, this effect will be executed
    setTimeout(() => this.canGoToPreviousPage = true, 800);
  }

  public setAddressInfo(key:string, value:string){
      AddressInformationComponent.address_info[key] = value;
  }

  public getSavedAddressInfo(): Address{
    return AddressInformationComponent.address_info;
  }

  private initializeAddressInfo(){
    if(!this.getSavedAddressInfo()){
      AddressInformationComponent.address_info = {
        country_name: '',
        region_name: '',
        street_address: '',
        city_name: '',
        zip_code: null
      }
    }
  }

  public signUp(): void{
    let newAddress = AddressInformationComponent.address_info;
    let newUser = ContactInformationComponent.contact_info;
    this.addressService.createAddress(newAddress).subscribe(res => {

        let address_id = res.address.address_id; 
        newUser.address_id = address_id;
        this.userService.createUser(newUser).subscribe(res => {
          
          if(res.message == "Success!"){
            document.querySelector('.sidebar').classList.add('slide-left') //execute the side-left effect (this is another way of doing so)

            setTimeout(() => {
              UserService.loggedUser = res.user;
              localStorage.setItem('currentUserId', res.user.user_id);
              console.log("User with id of " + res.user.user_id + " has logged in!");
              AppComponent.changeToNavbar();
            }, 800);
          }

        });
      
    });
  }
}
