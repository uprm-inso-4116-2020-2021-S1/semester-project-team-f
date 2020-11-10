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
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  private geocoder: google.maps.Geocoder;
  
  private static user_marker: google.maps.Marker; //the user's marker
  private static map: google.maps.Map;
  private static offices_mapping: Map<google.maps.Marker, any>;
  private static markers: google.maps.Marker[] = [];
  private static directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});

  constructor(private medicalOfficeService: MedicalOfficeService, private addressService: AddressService,
     private locationService: LocationService) { }

  ngAfterViewInit(): void {
    let coordinates = new google.maps.LatLng(18.196512, -66.4224762);

    let mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 8,
      styles: MAP_STYLE,
      mapTypeControl: false,
      streetViewControl: false, 
      minZoom: 3,
      fullscreenControl: false
    };

    MapComponent.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

    this.geocoder = new google.maps.Geocoder();
    this.requestUserLocation();
    this.markOfficeLocations();
  }

  private requestUserLocation(){
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position: Position) => { MapComponent.user_marker = new google.maps.Marker({
              position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        
              label: {
                color: 'black',
                text: "Your location",
              },
              icon: ICON_TYPE.PERSON_ICON,
              title: "Your location"
            }); }, err => MessageBoxComponent.displayMessageBox("In order to have a better experience in our application, we recommend you to allow access to location permissions.")

          );
        } else {
          // Browser doesn't support Geolocation
          alert("ERROR: Your browser doesn't support geolocation. ")
        }
  }

  private markOfficeLocations(){
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
  
    MapComponent.offices_mapping.set(marker, data);
    MapComponent.markers.push(marker)
    MapComponent.addOfficeListener(marker);
  }

    // Shows the places working places of the logged in user and add a listener to it.
    public static showWorkingPlacesOnly(condition: (o) => boolean, listener: (o) => void): void {
      for (let i = 0; i < this.markers.length; i++) { 
        let medical_office: MedicalOffice = this.offices_mapping.get(this.markers[i]);

        if(condition(medical_office)){ 
          this.markers[i].setIcon(ICON_TYPE.WORK_ICON);
          google.maps.event.clearListeners(this.markers[i], "click");

          this.markers[i].addListener("click",() => { 
            listener(medical_office);
            MapComponent.showOfficesOnly();
           });
        }
        else{
          this.markers[i].setMap(null);
        }
      }
       alert("Please select the office that you wish to manage...")
    }

    private static addOfficeListener(marker): void{
      marker.setIcon(ICON_TYPE.DOCTOR_ICON);
      marker.setMap(this.map);

      google.maps.event.addListener(marker, 'click', function() { 
        OfficeInformationComponent.medical_office = MapComponent.offices_mapping.get(marker);
        AppComponent.viewOffice();

        let start = MapComponent.user_marker.getPosition().lat() + ', ' + MapComponent.user_marker.getPosition().lng();
        let end = marker.getPosition().lat() + ', ' + marker.getPosition().lng();
        let directionsService = new google.maps.DirectionsService();

        directionsService.route(
          {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING,
          }, (response, status) => {
            if(status === 'OK'){ 
              MapComponent.user_marker.setMap(MapComponent.map);
              MapComponent.user_marker.setAnimation(google.maps.Animation.DROP);
              MapComponent.directionsRenderer.setDirections(response); 
              MapComponent.directionsRenderer.setMap(MapComponent.map);
              OfficeInformationComponent.distance = response.routes[0].legs[0].distance.text;
            }
          }
        );
     }); 
    }

    public static showOfficesOnly(){
      for (let i = 0; i < this.markers.length; i++) { 
        if(this.offices_mapping.has(this.markers[i])){
          google.maps.event.clearListeners(this.markers[i], "click");
          this.addOfficeListener(this.markers[i]);
        }
      }
    }

    public static resetRoute(){ 
      if(this.user_marker) this.user_marker.setMap(null);
      if(this.directionsRenderer) this.directionsRenderer.setMap(null); 
    }
}