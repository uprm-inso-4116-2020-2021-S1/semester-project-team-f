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

  public ReturntoNav(): void{
    document.querySelector('.sidebar').classList.add('slide-left'); 
    AppComponent.changeToNavbar();
  }
}
