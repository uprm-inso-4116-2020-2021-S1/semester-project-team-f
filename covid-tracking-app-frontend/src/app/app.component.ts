import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  private static hasLoggedIn: boolean;
  private static addingPatient: boolean;
  private static seeingInformation: boolean;
  private static changingContactInformation: boolean;
  private static changingAddressInformation: boolean;
  title = 'Coronavirus Tracking App';

  public isLoggedIn() { return AppComponent.hasLoggedIn; }
  public isAddingPatient() { return AppComponent.addingPatient; }
  public isSeeingInformation()  { return AppComponent.seeingInformation; }
  public isChangingContactInformation() { return AppComponent.changingContactInformation; }
  public isChangingAddressInformation() { return AppComponent.changingAddressInformation;}
  public static changeToNavbar(){ AppComponent.hasLoggedIn = true; }
  public static changeToLogin() { AppComponent.hasLoggedIn = false; }

  public static changeToAddPatient() { AppComponent.addingPatient = true; }

  public static changePatientInformation() { AppComponent.seeingInformation = true; }

  public static changeContactInformation() { 
    this.hideNavbar();
    this.changingContactInformation = true;
  }

  public static changeAddressInformation() { 
    this.hideNavbar();
    this.changingAddressInformation = true; 
  }
  
  public static exitContactInformation() { 
    this.hideSidebar();
    setTimeout(()=> this.changingContactInformation = false, 800);
  }

  public static exitAddressInformation() {
    this.hideSidebar(); 
    setTimeout(()=> this.changingAddressInformation = false, 800);
  }

  private static hideSidebar(): void{
      document.querySelector('.sidebar').classList.remove('slide-right'); 
      document.querySelector('.sidebar').classList.add('slide-left'); 
      document.querySelector('.navbar').classList.remove('slide-up');
      document.querySelector('.navbar').classList.add('slide-down');
  }

  private static hideNavbar(): void{
    document.querySelector('.navbar').classList.remove('slide-down')
    document.querySelector('.navbar').classList.add('slide-up') 
  }


  

}
