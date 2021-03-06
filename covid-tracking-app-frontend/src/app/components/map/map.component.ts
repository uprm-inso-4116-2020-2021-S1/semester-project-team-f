import { Component, AfterViewInit, ViewChild, ElementRef, Input} from '@angular/core';
import { MAP_STYLE, ICON_TYPE } from 'src/config';
import { MedicalOfficeService } from '../../services/medical-office.service';
import { AddressService } from '../../services/address.service';
import { LocationService } from '../../services/location.service'
import { Location } from '../../models/location';
import { AppComponent } from '../../app.component';
import { MedicalOffice } from '../../models/medical_office';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { VisitedLocationService } from '../../services/visited-location.service';
import { UserService } from 'src/app/services/user.service';
import { VisitedLocation } from 'src/app/models/visited_location';
import { WorkingOffice } from 'src/app/interfaces/WorkingOffice';
import { PatientService } from 'src/app/services/patient.service';
import { CovidService } from 'src/app/services/covid.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  @Input() parent: AppComponent;

  private geocoder: google.maps.Geocoder;
  private user_marker: google.maps.Marker; //the user's marker
  private route_distance: string; //saves the route_distance from a specific location to a coordinate
  private map: google.maps.Map;
  private offices_mapping: Map<google.maps.Marker, any>;
  private visited_locations_mapping: Map<google.maps.Marker, any>;
  private markers: google.maps.Marker[];
  private directions_renderer;
  private show_visited_locations: boolean;
  private mapsMouseEvent: google.maps.MouseEvent;

  constructor(private medicalOfficeService: MedicalOfficeService, private addressService: AddressService,
     private locationService: LocationService, private visitedLocationService: VisitedLocationService,
     private patientService: PatientService, private covidService: CovidService) { }

  ngAfterViewInit(): void {
    this.markers = [];
    this.directions_renderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
    this.parent.map_component = this;

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

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

    this.geocoder = new google.maps.Geocoder();
    this.requestUserLocation();
    this.markOfficeLocations();
    this.markCovidHotspots();
  }

  private markCovidHotspots(){
    this.visitedLocationService.getAllVisitedLocations().subscribe(res => {
      for(let visited_location of res.visited_locations){
          this.covidService.getCovidCasesByPatientId(visited_location.user_id).subscribe(res =>{
              if(res.message=="Success!"){
                for(let covid_case of res.cases){
                  let today: Date = new Date();
                  let map = this.map;
                  let difference =  Date.parse(today.toDateString()) - Date.parse(covid_case.date_tested);
              
                  if(difference <= 1209600000 && new Date(covid_case.date_tested) <= today && covid_case.test_status == 3){
                    this.locationService.getLocationById(visited_location.location_id).subscribe(res => {
                      const covidRadius = new google.maps.Circle({
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: "#FF0000",
                        fillOpacity: 0.35,
                        map,
                        center: {lat: res.location.lattitude, lng: res.location.longitude},
                        radius: 1000,
                      });
                    });
                  }

                
                }
              }
          });
            
          
      }
    })
  }

  private requestUserLocation(){
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position: Position) => { this.user_marker = new google.maps.Marker({
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
    this.offices_mapping = new Map<google.maps.Marker, any>();
    this.medicalOfficeService.getAllMedicalOffices().subscribe(res =>{
      for(let office of res.medical_offices){
        this.locationService.getLocationById(office.location_id).subscribe(res =>{
          let location: Location = res.location;
          let coordinates = new google.maps.LatLng(location.lattitude, location.longitude);

          //if the place is found, then we're going to invoke the passed function (in this case, add the office marker)
          this.findPlaceAndDoAction(coordinates, (result) => {
            let marker = this.addMarker(result, office.office_name, ICON_TYPE.DOCTOR_ICON)
            this.offices_mapping.set(marker, office);
            this.addOfficeListener(marker);
          });
        });
      }
    });
  }

  private findPlaceAndDoAction(coordinates, action: (result) => void){
              //find the place
              this.geocoder.geocode(
                {location: coordinates},
                (
                  results: google.maps.GeocoderResult[],
                  status: google.maps.GeocoderStatus
                ) => {

                  if (status === google.maps.GeocoderStatus.OK) {
                    //do action
                    action(results[0]);
                  }
                }
              );
  }

  public initVisitedLocations(){
    this.visitedLocationService.getLocationsVisitedByUserId(UserService.loggedUser.user_id).subscribe(res => {
      if(res.message == "Success!"){
        this.visited_locations_mapping = new Map<google.maps.Marker, any>();
        this.show_visited_locations = res.visited_locations.length != 0;
        for(let visited_location of res.visited_locations){

          let today: Date = new Date();

          let difference =  Date.parse(today.toDateString()) - Date.parse(visited_location.date_visited);
      
          if(!(difference <= 1209600000 && new Date(visited_location.date_visited) <= today)){
            this.visitedLocationService.deleteVisitedLocation(visited_location).subscribe(res => {
              console.log("Visited location: " + visited_location + " was deleted due to oldness");
            });
          }
          else{
            this.locationService.getLocationById(visited_location.location_id).subscribe(res => {
              if(res.message == "Success!"){
                let coordinates = new google.maps.LatLng(res.location.lattitude, res.location.longitude);
                this.findPlaceAndDoAction(coordinates, result => {
                  let visited_date_string = new Date(visited_location.date_visited).toLocaleDateString('en-US', {timeZone: 'UTC'});
  
                    let marker = this.addMarker(result, visited_date_string, ICON_TYPE.DEFAULT_ICON);
                    this.visited_locations_mapping.set(marker, visited_location);
                    this.addVisitedLocationListener(marker);
                });
              }
            });
          }

        }
      }
    });
  }

  public containsVisitedLocations(): boolean{
    return this.visited_locations_mapping.size != 0;
  }

  //when user gets logged out, his visited locations will not appear on the map
  public hideVisitedLocations(){
      for(let i = 0; i < this.markers.length; i++){
        let marker: google.maps.Marker = this.markers[i];
        if(this.visited_locations_mapping.has(marker)){
              marker.setMap(null);
              this.markers.splice(i--, 1);
        }
      }
      this.visited_locations_mapping = null;
      this.map.setOptions({draggableCursor:null});
      google.maps.event.clearListeners(this.map, 'click');
  }

  public removeVisitedLocationMarker(visited_location: VisitedLocation){
      for(let marker of this.visited_locations_mapping.keys()){
        if(this.visited_locations_mapping.get(marker) == visited_location){
            this.visited_locations_mapping.delete(marker);

            marker.setMap(null);

            let indexOfMarker = this.markers.indexOf(marker);

            this.markers.splice(indexOfMarker, 1);
          }
        }
  }

  public addMarker(place: google.maps.GeocoderResult, marker_name: string, icon_type){

    const marker = new google.maps.Marker({
      map: this.map,
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

    this.markers.push(marker);

    return marker;
  }

    // Shows the places working places of the logged in user and add a listener to it.
    public showWorkingOfficesUnderCondition(working_office: WorkingOffice): void {
      for (let i = 0; i < this.markers.length; i++) { 
        let medical_office: MedicalOffice = this.offices_mapping.get(this.markers[i]);

        if(working_office.satisfyCondition(medical_office)){ 
          this.markers[i].setIcon(ICON_TYPE.WORK_ICON);
          google.maps.event.clearListeners(this.markers[i], "click");

          this.markers[i].addListener("click",() => { 
            working_office.doAction(medical_office);
            this.showMedicalOffices();
           });
        }
        else{
          this.markers[i].setMap(null);
        }
      }
      alert("Please select the office that you wish to manage...");
    }

    public addVisitedLocationListener(visited_location_marker){
      //declared so that it can be used on the inner function
      let visited_locations_mapping = this.visited_locations_mapping; 
      let parent = this.parent;

      google.maps.event.addListener(visited_location_marker, 'click', () => { 
        parent.selected_location = visited_locations_mapping.get(visited_location_marker);
        AppComponent.changeManagingVisitedLocation();
     }); 
    }

    public addVisitedLocationDate(){
      alert("Click on the location you visited on the map...");

      this.map.setOptions({draggableCursor:'crosshair'});
      this.map.addListener("click", (mapsMouseEvent) => { 
        this.mapsMouseEvent = mapsMouseEvent;
        MessageBoxComponent.showVisitedDateInputBox(); 
      });
    }

    public createVisitedLocation(visited_date: string){
      let coordinates = this.mapsMouseEvent.latLng;
      
      let location: Location = {
        lattitude: coordinates.lat(),
        longitude: coordinates.lng()
      }

      this.locationService.createLocation(location).subscribe(res => {
        if(res.message == "Success!"){

          let visited_location: VisitedLocation = {
            user_id: UserService.loggedUser.user_id,
            location_id: res.location.location_id,
            date_visited: visited_date
          }

          this.visitedLocationService.createVisitedLocation(visited_location).subscribe(res => {
            if(res.message == "Success!"){
                let visited_date_string = new Date(res.visited_location.date_visited).toLocaleDateString('en-US', {timeZone: 'UTC'});

                this.findPlaceAndDoAction(coordinates, (result) =>{
                  let marker = this.addMarker(result, visited_date_string, ICON_TYPE.DEFAULT_ICON);
                  this.visited_locations_mapping.set(marker, visited_location);
                  this.addVisitedLocationListener(marker);
                });
                MessageBoxComponent.displayMessageBox("Visited location was added!");
          }});
        }
      }, err => alert(err.error.reason));
      this.map.setOptions({draggableCursor:null});
      this.mapsMouseEvent = null;
      google.maps.event.clearListeners(this.map, 'click');
    }

    public toggleVisitedLocations(){
      this.show_visited_locations = !this.show_visited_locations;

      for(let i = 0; i < this.markers.length; i++){
        let marker = this.markers[i];
        if(this.visited_locations_mapping.has(marker)){
          if(this.show_visited_locations) marker.setMap(this.map);
          else marker.setMap(null);
        }
      }
    }

    private addOfficeListener(office_marker): void{
      office_marker.setIcon(ICON_TYPE.DOCTOR_ICON);
      office_marker.setMap(this.map);

      //declared so that it can be used on the inner function
      let office_mappings = this.offices_mapping; 
      let user_marker = this.user_marker;
      let curr_obj = this;

      let parent = this.parent;

      google.maps.event.addListener(office_marker, 'click', () => { 
        parent.selected_office = office_mappings.get(office_marker);
        AppComponent.viewOffice();

        let start = curr_obj.getMarkerLocationAsString(user_marker);
        let end = curr_obj.getMarkerLocationAsString(office_marker);

        curr_obj.drawUserRoute(start, end);
     }); 
    }

    private drawUserRoute(start: string, end: string): void{
      let directions_service = new google.maps.DirectionsService();

      directions_service.route(
        {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING,
        }, (response, status) => {
          if(status === 'OK'){ 
            this.user_marker.setMap(this.map);
            this.user_marker.setAnimation(google.maps.Animation.DROP);
            this.directions_renderer.setDirections(response); 
            this.directions_renderer.setMap(this.map);
            this.setRouteDistance(response.routes[0].legs[0].distance.text);
          }
        }
      );
    }

    private getMarkerLocationAsString(marker: google.maps.Marker): string{ 
      return marker.getPosition().lat() + ', ' + marker.getPosition().lng(); 
    }

    public showMedicalOffices(){
      for (let i = 0; i < this.markers.length; i++) { 
        if(this.offices_mapping.has(this.markers[i])){
          google.maps.event.clearListeners(this.markers[i], "click");
          this.addOfficeListener(this.markers[i]);
        }
      }
    }

    public resetRoute(){ 
      if(this.user_marker) this.user_marker.setMap(null);
      if(this.directions_renderer) this.directions_renderer.setMap(null); 
    }

    public getRouteDistance(): string { return this.route_distance; }
    public setRouteDistance(distance: string): void { this.route_distance = distance; }
    public canShowVisitedLocations(): boolean { return this.show_visited_locations; }
}