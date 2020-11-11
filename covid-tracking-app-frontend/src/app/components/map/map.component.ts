import { Component, AfterViewInit, ViewChild, ElementRef, Input} from '@angular/core';
import { MAP_STYLE, ICON_TYPE } from 'src/config';
import { MedicalOfficeService } from '../../services/medical-office.service';
import { AddressService } from '../../services/address.service';
import { LocationService } from '../../services/location.service'
import { Location } from '../../models/location';
import { AppComponent } from '../../app.component';
import { MedicalOffice } from '../../models/medical_office';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { VisitedLocationService } from 'src/app/services/visited-location.service';

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
  private markers: google.maps.Marker[] = [];
  private directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});

  constructor(private medicalOfficeService: MedicalOfficeService, private addressService: AddressService,
     private locationService: LocationService) { }

  ngAfterViewInit(): void {
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

    this.markers.push(marker)

    return marker;
  }

    // Shows the places working places of the logged in user and add a listener to it.
    public showWorkingPlacesOnly(condition: (o) => boolean, listener: (o) => void): void {
      for (let i = 0; i < this.markers.length; i++) { 
        let medical_office: MedicalOffice = this.offices_mapping.get(this.markers[i]);

        if(condition(medical_office)){ 
          this.markers[i].setIcon(ICON_TYPE.WORK_ICON);
          google.maps.event.clearListeners(this.markers[i], "click");

          this.markers[i].addListener("click",() => { 
            listener(medical_office);
            this.showOfficesOnly();
           });
        }
        else{
          this.markers[i].setMap(null);
        }
      }
       alert("Please select the office that you wish to manage...")
    }

    public addVisitedLocation(){
      this.map.addListener("click", (mapsMouseEvent) => {
        let coordinates = mapsMouseEvent.latLng;
        this.findPlaceAndDoAction(coordinates, (result) =>{
          let marker = this.addMarker(result, new Date().toDateString(), ICON_TYPE.DEFAULT_ICON)
        })
        
        google.maps.event.clearListeners(this.map, 'click');
      });
    }

    //working on it...
    public showVisitedLocation(show: boolean){
      for(let marker of this.markers){
        if(marker.getIcon() == ICON_TYPE.DEFAULT_ICON){
          if(show) marker.setMap(this.map);
          else marker.setMap(null);
        }
      }
    }

    private addOfficeListener(marker): void{
      marker.setIcon(ICON_TYPE.DOCTOR_ICON);
      marker.setMap(this.map);

      //declared so that it can be used on the inner function
      let office_mappings = this.offices_mapping; 
      let user_marker = this.user_marker;
      let directionsRenderer = this.directionsRenderer;
      let curr_obj = this;

      let parent = this.parent;

      google.maps.event.addListener(marker, 'click', function() { 
        parent.selected_office = office_mappings.get(marker);
        AppComponent.viewOffice();

        let start = user_marker.getPosition().lat() + ', ' + user_marker.getPosition().lng();
        let end = marker.getPosition().lat() + ', ' + marker.getPosition().lng();
        let directionsService = new google.maps.DirectionsService();

        directionsService.route(
          {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING,
          }, (response, status) => {
            if(status === 'OK'){ 
              user_marker.setMap(this.map);
              user_marker.setAnimation(google.maps.Animation.DROP);
              directionsRenderer.setDirections(response); 
              directionsRenderer.setMap(this.map);
              curr_obj.setRouteDistance(response.routes[0].legs[0].distance.text);
            }
          }
        );
     }); 
    }

    public showOfficesOnly(){
      for (let i = 0; i < this.markers.length; i++) { 
        if(this.offices_mapping.has(this.markers[i])){
          google.maps.event.clearListeners(this.markers[i], "click");
          this.addOfficeListener(this.markers[i]);
        }
      }
    }

    public resetRoute(){ 
      if(this.user_marker) this.user_marker.setMap(null);
      if(this.directionsRenderer) this.directionsRenderer.setMap(null); 
    }

    public getRouteDistance(): string { return this.route_distance; }
    public setRouteDistance(distance: string): void { this.route_distance = distance; }
}