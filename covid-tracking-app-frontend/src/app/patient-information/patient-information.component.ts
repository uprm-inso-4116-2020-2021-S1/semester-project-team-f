import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-patient-information',
  templateUrl: './patient-information.component.html',
  styleUrls: ['./patient-information.component.scss']
})
export class PatientInformationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public ReturntoNav(): void{
    document.querySelector('.sidebar').classList.add('slide-left'); 
    AppComponent.changeToNavbar();
  }
}