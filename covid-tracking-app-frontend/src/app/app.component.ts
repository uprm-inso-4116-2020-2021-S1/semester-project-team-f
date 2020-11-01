import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  private static hasLoggedIn: boolean;
  private static addingPatient: boolean;
  private static SeeingInformation: boolean;
  private static ChangingAccountInformation: boolean;
  title = 'Coronavirus Tracking App';

  public isLoggedIn() { return AppComponent.hasLoggedIn; }
  public isAddingPatient() { return AppComponent.addingPatient; }
  public isSeeingInformation()  { return AppComponent.SeeingInformation; }
  public isChangingAccountInformation() { return AppComponent.ChangingAccountInformation; }
  public static changeToNavbar(){ AppComponent.hasLoggedIn = true; }
  public static changeToLogin() { AppComponent.hasLoggedIn = false; }
  public static changeToAddPatient() { AppComponent.addingPatient = true; }
  public static changePatientInformation() { AppComponent.SeeingInformation = true; }
  public static changeAccountInformation() { AppComponent.ChangingAccountInformation = true;}


  

}
