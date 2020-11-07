import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { MedicalOffice } from '../models/medical_office';


@Component({
  selector: 'app-office-information',
  templateUrl: './office-information.component.html',
  styleUrls: ['./office-information.component.scss']
})
export class OfficeInformationComponent implements OnInit {
  public effectsInAction: string[];
  public static isViewingOffice: boolean;
  static medical_office: MedicalOffice

  constructor() { }

  ngOnInit(): void {
    this.effectsInAction = ["slide-right", "slide-left"]; //the default effects when someone enters to the main-page
  }

  public exitOfficeView(): void{
    OfficeInformationComponent.medical_office = null;
    setTimeout(() => {AppComponent.exitOfficeView(); }, 800);
    OfficeInformationComponent.isViewingOffice = false; 
  }

  public getOffice(): MedicalOffice{
    return OfficeInformationComponent.medical_office;
  }

  public static viewOffice(): void{
    setTimeout(() => {AppComponent.viewOffice(); }, 800);
    OfficeInformationComponent.isViewingOffice = true;
  }


}
