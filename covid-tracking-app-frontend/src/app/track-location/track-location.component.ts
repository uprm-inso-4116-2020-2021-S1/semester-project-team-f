import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-track-location',
  templateUrl: './track-location.component.html',
  styleUrls: ['./track-location.component.scss']
})
export class TrackLocationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public returnToNavbar(): void{ setTimeout(() => { AppComponent.ExitHelp() }, 800); }

}