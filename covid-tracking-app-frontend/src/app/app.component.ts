import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  private static hasLoggedIn: boolean;
  private static addingOrRemovingPatient: boolean;
  private static managingCovidCases: boolean;
  private static changingContactInformation: boolean;
  private static changingAddressInformation: boolean;
  private static seeingHelp: boolean;
  title = 'Coronavirus Tracking App';

  public isLoggedIn() { return AppComponent.hasLoggedIn; }
  public isAddingOrRemovingPatient() { return AppComponent.addingOrRemovingPatient; }
  public isManagingCovidCases() { return AppComponent.managingCovidCases; }
  public isSeeingHelp()  { return AppComponent.seeingHelp; }
  public isChangingContactInformation() { return AppComponent.changingContactInformation; }
  public isChangingAddressInformation() { return AppComponent.changingAddressInformation;}
  public static changeToNavbar(){ AppComponent.hasLoggedIn = true; }
  public static changeToLogin() { AppComponent.hasLoggedIn = false; }

  public static seeHelpInfo() { 
    this.hideNavbar();
    this.seeingHelp= true;
  }
  public static changeAddOrRemovePatients() { 
    this.hideNavbar();
    this.addingOrRemovingPatient = true;
  }
  public static changeManagingCovidCases() { 
    this.hideNavbar();
    this.managingCovidCases = true;
  }

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

  public static exitAddOrRemovePatient() {
    this.hideSidebar(); 
    setTimeout(()=> this.addingOrRemovingPatient = false, 800);
  }

  public static exitManagingCovidCases() { 
    this.hideSidebar(); 
    setTimeout(()=> this.managingCovidCases = false, 800);
  }

  public static ExitHelp() {
    this.hideSidebar(); 
    setTimeout(()=> this.seeingHelp = false, 800);
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