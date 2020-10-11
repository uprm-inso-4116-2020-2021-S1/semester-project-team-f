import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MAP_STYLE, ICON_TYPE } from 'src/config';
import { MedicalOfficeService } from '../services/medical-office.service';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  private map: google.maps.Map;
  private service: google.maps.places.PlacesService;
  
  private lat = 18.196512;
  private lng = -66.4224762;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {center: this.coordinates,zoom: 8,  styles: MAP_STYLE, mapTypeControl: false,
  streetViewControl: false, minZoom: 3, fullscreenControl: false};

  constructor(private medicalOfficeService: MedicalOfficeService, private addressService: AddressService) { }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.service = new google.maps.places.PlacesService(this.map);
    this.markOfficeLocations();
  }

  markOfficeLocations(){
    this.medicalOfficeService.getAllMedicalOffices().subscribe(res =>{
      for(let office of res.medical_offices){
        this.addressService.getAddressById(office.address_id).subscribe(res =>{
          let address: Address = res.address;
          let address_string: string = address.street_address + " " 
          + address.city_name + ", " + address.country_name + ", " + address.zip_code

          this.findAndMarkPlace(address_string, office.office_name, ICON_TYPE.DOCTOR_ICON);
        });
      }
    });
  }

  private findAndMarkPlace(place_name: string, marker_name: string, icon_type){
              const request = {
                query: place_name,
                fields: ["name", "geometry"],
              };

              //find the place
              this.service.findPlaceFromQuery(
                request,
                (
                  results: google.maps.places.PlaceResult[],
                  status: google.maps.places.PlacesServiceStatus
                ) => {

                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (let i = 0; i < results.length; i++) {
                      this.createMarker(results[i], marker_name, icon_type);
                    }
            
                    this.map.setCenter(
                      (results[0].geometry as google.maps.places.PlaceGeometry).location
                    );
                  }
                }
              );
  }

  private createMarker(place: google.maps.places.PlaceResult, marker_name: string, icon_type) {

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
  
    let infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, "click", () => {
      infowindow.open(this.map);
    });
  }
}
