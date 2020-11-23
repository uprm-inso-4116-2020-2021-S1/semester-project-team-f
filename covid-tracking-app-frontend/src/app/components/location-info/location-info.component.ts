import { Component, OnInit, Input } from '@angular/core';
import { Location } from 'src/app/models/location';
import { VisitedLocation } from 'src/app/models/visited_location';
import { MapComponent } from '../map/map.component';
import { LocationService } from 'src/app/services/location.service';
import { AppComponent } from 'src/app/app.component';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { VisitedLocationService } from 'src/app/services/visited-location.service';

type LocationInfo = Location & VisitedLocation;

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.scss']
})
export class LocationInfoComponent implements OnInit {

  @Input() map: MapComponent;
  @Input() visited_location: VisitedLocation

  private location_info: LocationInfo;

  constructor(private locationService: LocationService, private visitedLocationService: VisitedLocationService) { }

  ngOnInit(): void {
    this.locationService.getLocationById(this.visited_location.location_id).subscribe(res => {
      if(res.message == "Success!"){
        this.location_info = {
          location_id: res.location.location_id,
          lattitude: res.location.lattitude,
          longitude: res.location.longitude,
          closest_address_id: res.location.closest_address_id,
          date_visited: this.visited_location.date_visited,
          user_id: this.visited_location.user_id
        }
      }
    })
  }

  public getLocation(): LocationInfo{ return this.location_info; }
  public returnToNavbar(): void{ AppComponent.exitManagingVisitedLocation(); }

  public deleteLocation(): void{
    let message = "Are you sure you want to delete this visited location? This cannot be undone.";
    MessageBoxComponent.confirmMessageBox(message, () => {
      this.visitedLocationService.deleteVisitedLocation(this.visited_location).subscribe(res =>{
          if(res.message == "Success!"){
            MessageBoxComponent.displayMessageBox("Location was successfully deleted.");
            this.map.removeVisitedLocationMarker(this.visited_location);
            this.returnToNavbar();
          }
      });
    });
  }
}
