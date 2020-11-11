import { Component } from '@angular/core';
import { LoginSidebarComponent } from './login-sidebar/login-sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  private static hasLoggedIn: boolean;
  private static addingOrRemovingPatient: boolean;
  private static managingCovidCases: boolean;
  private static managingEmployees: boolean;
  private static viewingOffice: boolean;
  private static viewingPrevCovidTests: boolean;
  private static changingContactInformation: boolean;
  private static changingAddressInformation: boolean;
  private static seeingHelp: boolean;
  title = 'Coronavirus Tracking App';

  public isLoggedIn() { return AppComponent.hasLoggedIn; }
  public isAddingOrRemovingPatient() { return AppComponent.addingOrRemovingPatient; }
  public isManagingCovidCases() { return AppComponent.managingCovidCases; }
  public isManagingEmployees() { return AppComponent.managingEmployees; }
  public isSeeingHelp()  { return AppComponent.seeingHelp; }
  public isChangingContactInformation() { return AppComponent.changingContactInformation; }
  public isChangingAddressInformation() { return AppComponent.changingAddressInformation;}
  public isViewingOffice(){ return AppComponent.viewingOffice;}
  public isViewingPrevCovidTests() { return AppComponent.viewingPrevCovidTests; }

  public static changeToNavbar(){ 
    try{ this.hideSidebar(); }
    catch{setTimeout(()=> this.hasLoggedIn = true, 800);}
   }
  public static changeToLogin() { 
    this.hideNavbar();
    setTimeout(()=> {
      this.hasLoggedIn = false;
      document.querySelector('.sidebar').classList.add('slide-right'); }, 800); //slide-right as soon as user logs out
  }

  public static seeHelpInfo() { 
    this.hideNavbar();
    this.seeingHelp= true;
  }

  public static viewOffice(){
    if(this.hasLoggedIn) this.hideNavbar(); 
    else this.showOfficeWhenLoggedOut(); 

    this.viewingOffice = !this.managingCovidCases && !this.addingOrRemovingPatient && 
    !this.changingContactInformation && !this.changingAddressInformation && !this.managingEmployees
    && !this.viewingPrevCovidTests;
  }

  public static changeAddOrRemovePatients() { 
    this.hideNavbar();
    this.addingOrRemovingPatient = true;
  }

  public static changeManagingCovidCases() { 
    this.hideNavbar();
    this.managingCovidCases = true;
  }

  public static changeManagingEmployees() {
    this.hideNavbar();
    this.managingEmployees = true;
  }

  public static changeContactInformation() { 
    this.hideNavbar();
    this.changingContactInformation = true;
  }

  public static changeAddressInformation() { 
    this.hideNavbar();
    this.changingAddressInformation = true; 
  }

  public static changeViewPrevCovidTests(){
    this.hideNavbar();
    this.viewingPrevCovidTests = true;
  }

  public static exitOfficeView(){
    if(this.hasLoggedIn) this.hideSidebar();
    else this.hideOfficeWhenLoggedOut();

    setTimeout(()=> this.viewingOffice = false, 800);
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

  public static exitManagingEmployees() {
    this.hideSidebar();
    setTimeout(()=> this.managingEmployees = false, 800);
  }

  public static exitViewPrevCovidTests(){
    this.hideSidebar();
    setTimeout(()=> this.viewingPrevCovidTests = false, 800);
  }

  public static exitHelp() {
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

  private static showOfficeWhenLoggedOut(){
    try{ document.querySelector('.sidebar').classList.remove('slide-right');  }
    catch { /*do nothing...*/ }  
    
    document.querySelector('.sidebar').classList.add('slide-left'); 
  }

  private static hideOfficeWhenLoggedOut(){
    document.querySelector('.office-info').classList.remove('slide-right'); 
    document.querySelector('.office-info').classList.add('slide-left'); 
    document.querySelector('.sidebar').classList.remove('slide-left'); 
    document.querySelector('.sidebar').classList.add('slide-right'); 
  }
}