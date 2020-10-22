import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  private static hasLoggedIn: boolean;
  private static addingPatient: boolean;
  title = 'Coronavirus Tracking App';

  public isLoggedIn() { return AppComponent.hasLoggedIn; }
  public isAddingPatient() { return AppComponent.addingPatient; }
  public static changeToNavbar(){ AppComponent.hasLoggedIn = true; }
  public static changeToLogin() { AppComponent.hasLoggedIn = false; }
  public static changeToAddPatient() { AppComponent.addingPatient = true; }
  

}
