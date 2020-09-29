import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MAP_STYLE } from 'src/config';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  map: google.maps.Map;
  
  lat = 18.196512;
  lng = -66.4224762;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {center: this.coordinates,zoom: 8,  styles: MAP_STYLE, mapTypeControl: false,
  streetViewControl: false, minZoom: 3, fullscreenControl: false};

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(20, 9.4), new google.maps.LatLng(60.23, 9.7)) / 1000);
  }
}
