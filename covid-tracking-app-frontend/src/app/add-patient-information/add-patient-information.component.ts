import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-add-patient-information',
  templateUrl: './add-patient-information.component.html',
  styleUrls: ['./add-patient-information.component.scss']
})
export class AddPatientInformationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public returnToNavbar(): void{ setTimeout(() => { AppComponent.ExitAddRemovePatient(); }, 800); }


  
}
