import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MAP_STYLE, ICON_TYPE } from 'src/config';
import { MedicalOfficeService } from '../services/medical-office.service';
import { AddressService } from '../services/address.service';
import { LocationService } from '../services/location.service'
import { Location } from '../models/location';
import { DoctorService } from '../services/doctor.service';
import { AppComponent } from '../app.component';
import { MedicalOffice } from '../models/medical_office';
import { ManagePatientsComponent } from '../manage-patients/manage-patients.component';
import { CovidCasesComponent } from '../covid-cases/covid-cases.component';
import {OfficeInformationComponent} from '../office-information/office-information.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  private geocoder: google.maps.Geocoder;
  
  private lat = 18.196512;
  private lng = -66.4224762;

  private static map: google.maps.Map;
  private static offices_mapping: Map<google.maps.Marker, any>;
  private static markers: google.maps.Marker[] = [];

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {center: this.coordinates,zoom: 8,  styles: MAP_STYLE, mapTypeControl: false,
  streetViewControl: false, minZoom: 3, fullscreenControl: false};

  constructor(private medicalOfficeService: MedicalOfficeService, private addressService: AddressService,
     private locationService: LocationService) { }

  ngAfterViewInit(): void {
    MapComponent.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.geocoder = new google.maps.Geocoder();
    this.markOfficeLocations();
  }
  markOfficeLocations(){
    MapComponent.offices_mapping = new Map<google.maps.Marker, any>();
    this.medicalOfficeService.getAllMedicalOffices().subscribe(res =>{
      for(let office of res.medical_offices){
        this.locationService.getLocationById(office.location_id).subscribe(res =>{
          let location: Location = res.location;
          let coordinates = new google.maps.LatLng(location.lattitude, location.longitude);

          this.findAndMarkPlace(coordinates, office.office_name, ICON_TYPE.DOCTOR_ICON, office);
        });
      }
    });
  }

  private findAndMarkPlace(coordinates, marker_name: string, icon_type, data){
              //find the place
              this.geocoder.geocode(
                {location: coordinates},
                (
                  results: google.maps.GeocoderResult[],
                  status: google.maps.GeocoderStatus
                ) => {

                  if (status === google.maps.GeocoderStatus.OK) {
                    //mark it, if it was found
                    this.addMarker(results[0], marker_name, icon_type, data);
                    MapComponent.map.setCenter( (results[0].geometry as google.maps.places.PlaceGeometry).location );
                  }

                }
              );
  }

  private addMarker(place: google.maps.GeocoderResult, marker_name: string, icon_type, data){

    const marker = new google.maps.Marker({
      map: MapComponent.map,
      position: (place.geometry as google.maps.places.PlaceGeometry).location,

      label: {
        color: 'black',
        fontWeight: 'bold',
        text: marker_name,
      },
      icon:
       icon_type,
      title: marker_name
    
    });

    google.maps.event.addListener(marker, 'click', function() { 
      OfficeInformationComponent.viewOffice();
   }); 

    MapComponent.offices_mapping.set(marker, data);
    MapComponent.markers.push(marker)
    OfficeInformationComponent.medical_office = MapComponent.offices_mapping.get(marker);
  }

    // Shows only the places where the logged in doctor works.
    public static showWorkingPlacesOnly(patient_listener: boolean): void {
      
      for (let i = 0; i < this.markers.length; i++) { 
        let medical_office: MedicalOffice = this.offices_mapping.get(this.markers[i]);

        if(DoctorService.doctorOfficesId.has(medical_office.office_id)){ 
          this.markers[i].setIcon(ICON_TYPE.WORK_ICON);
          
          if(patient_listener){
              this.markers[i].addListener("click",() => {
          
              ManagePatientsComponent.medical_office = medical_office;
              AppComponent.changeAddOrRemovePatients();
              this.hideWorkingPlacesAndShowOffices();
              });
          }
          else{
            this.markers[i].addListener("click",() => {
          
              CovidCasesComponent.medical_office = medical_office;
              AppComponent.changeManagingCovidCases();
              this.hideWorkingPlacesAndShowOffices();
              });
          }

         }
        else{ 
          this.markers[i].setMap(null); //hide label from the map
         } 
       }

       alert("Please select the office that you wish to manage...")
    }

    public static hideWorkingPlacesAndShowOffices(){
      for (let i = 0; i < this.markers.length; i++) { 
        if(this.offices_mapping.has(this.markers[i])){
          google.maps.event.clearListeners(this.markers[i], "click");
          this.markers[i].setIcon(ICON_TYPE.DOCTOR_ICON);
          this.markers[i].setMap(this.map);
          this.markers[i].addListener("click",() => {
            OfficeInformationComponent.viewOffice();
            });
        }
      }
    }
}
