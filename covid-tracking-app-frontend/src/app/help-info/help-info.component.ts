import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-help-info',
  templateUrl: './help-info.component.html',
  styleUrls: ['./help-info.component.scss']
})
export class HelpInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public returnToNavbar(): void{ setTimeout(() => { AppComponent.exitHelp() }, 800); }

}
