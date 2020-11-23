import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../../app.component';
import { MedicalOffice } from '../../models/medical_office';
import { MapComponent } from '../map/map.component';


@Component({
  selector: 'app-office-information',
  templateUrl: './office-information.component.html',
  styleUrls: ['./office-information.component.scss']
})
export class OfficeInformationComponent implements OnInit {

  @Input() map: MapComponent;
  @Input() medical_office: MedicalOffice

  constructor() { }

  ngOnInit(): void {

  }

  public exitOfficeView(): void{
    this.map.resetRoute();
    AppComponent.exitOfficeView(); 
  }

  public getOffice(): MedicalOffice{ return this.medical_office; }
  public getDistance(): string{ return this.map.getRouteDistance(); }
}
