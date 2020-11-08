import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { MedicalOffice } from '../models/medical_office';
import { MapComponent } from '../map/map.component';


@Component({
  selector: 'app-office-information',
  templateUrl: './office-information.component.html',
  styleUrls: ['./office-information.component.scss']
})
export class OfficeInformationComponent implements OnInit {
  public static medical_office: MedicalOffice
  public static distance;

  constructor() { }

  ngOnInit(): void {

  }

  public exitOfficeView(): void{
    OfficeInformationComponent.medical_office = null;
    OfficeInformationComponent.distance = null;
    MapComponent.resetRoute();
    AppComponent.exitOfficeView(); 
  }

  public getOffice(): MedicalOffice{
    return OfficeInformationComponent.medical_office;
  }

  public getDistance(): MedicalOffice{
    return OfficeInformationComponent.distance;
  }
}
