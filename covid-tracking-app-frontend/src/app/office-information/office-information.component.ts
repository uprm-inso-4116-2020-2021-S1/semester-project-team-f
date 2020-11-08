import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { MedicalOffice } from '../models/medical_office';


@Component({
  selector: 'app-office-information',
  templateUrl: './office-information.component.html',
  styleUrls: ['./office-information.component.scss']
})
export class OfficeInformationComponent implements OnInit {
  public static isViewingOffice: boolean;
  static medical_office: MedicalOffice

  constructor() { }

  ngOnInit(): void {

  }

  public exitOfficeView(): void{
    OfficeInformationComponent.medical_office = null;
    AppComponent.exitOfficeView(); 
  }

  public getOffice(): MedicalOffice{
    return OfficeInformationComponent.medical_office;
  }
}
