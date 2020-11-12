import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MAP_STYLE, ICON_TYPE } from 'src/config';
import { MedicalOfficeService } from '../services/medical-office.service';
import { AddressService } from '../services/address.service';
import { LocationService } from '../services/location.service'
import { Location } from '../models/location';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  private map: google.maps.Map;
  private service: google.maps.places.PlacesService;
  private geocoder: google.maps.Geocoder;
  
  private lat = 18.196512;
  private lng = -66.4224762;

  private markers: google.maps.Marker[] = [];

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {center: this.coordinates,zoom: 8,  styles: MAP_STYLE, mapTypeControl: false,
  streetViewControl: false, minZoom: 3, fullscreenControl: false};

  constructor(private medicalOfficeService: MedicalOfficeService, private addressService: AddressService,
     private locationService: LocationService) { }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.service = new google.maps.places.PlacesService(this.map);
    this.geocoder = new google.maps.Geocoder();
    this.markOfficeLocations();
  }

  markOfficeLocations(){
    this.medicalOfficeService.getAllMedicalOffices().subscribe(res =>{
      for(let office of res.medical_offices){
        this.locationService.getLocationById(office.location_id).subscribe(res =>{
          let location: Location = res.location;
          let coordinates = new google.maps.LatLng(location.lattitude, location.longitude);

          this.findAndMarkPlace(coordinates, office.office_name, ICON_TYPE.DOCTOR_ICON);
        });
      }
    });
  }

  private findAndMarkPlace(coordinates, marker_name: string, icon_type){
              //find the place
              this.geocoder.geocode(
                {location: coordinates},
                (
                  results: google.maps.GeocoderResult[],
                  status: google.maps.GeocoderStatus
                ) => {

                  if (status === google.maps.GeocoderStatus.OK) {
                    this.addMarker(results[0], marker_name, icon_type);
            
                    this.map.setCenter(
                      (results[0].geometry as google.maps.places.PlaceGeometry).location
                    );
                  }
                }
              );
  }

  private addMarker(place: google.maps.GeocoderResult, marker_name: string, icon_type) {

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
  }

    // Shows office markers currently in the array.
    private showOrHideOfficeMarkers(map: google.maps.Map | null) {
      for (let i = 0; i < this.markers.length; i++) {
        if(this.markers[i].getIcon() == ICON_TYPE.DOCTOR_ICON)
            this.markers[i].setMap(map);
      }
    }

    public static validate(address: string, callback){
      let geocode = new google.maps.Geocoder();
      let found = geocode.geocode({address}, 
                (
                  results: google.maps.GeocoderResult[],
                  status: google.maps.GeocoderStatus
                ) => {
                  if(status === "OK"){
                    callback(true); //callback pq geocoder es asincrónico
                  }
                  else{
                    callback(false);
                  }
                });
                
    }
}
