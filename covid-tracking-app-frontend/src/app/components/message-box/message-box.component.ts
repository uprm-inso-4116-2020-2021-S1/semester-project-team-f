import { Component, OnInit, Input } from '@angular/core';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  @Input() map: MapComponent;

  public static message: string;
  public error: string;
  private static element;
  private static type; //1 - display message, 2 - confirmation message, 3 - add visited location input
  private static action;

  constructor() { }

  ngOnInit(): void {
    MessageBoxComponent.element = document.getElementById("my-message");
  }

  public closeMessageBox(){
    MessageBoxComponent.element.style.display = "none";
    MessageBoxComponent.message = null;
  }

  public getMessage(): string{
    return MessageBoxComponent.message;
  }

  public static displayMessageBox(message: string){
    this.type = 1;
    this.element.style.display = "block";
    this.message = message;
  }

  public static confirmMessageBox(message: string, action){
    this.type = 2;
    this.element.style.display = "block";
    this.message = message;
    this.action = action;
  }

  public static showVisitedDateInputBox(){
    this.type = 3;
    this.element.style.display = "block";
    this.message = "Please enter the date you visited this location: ";
  }

  public doAction(){
    MessageBoxComponent.action();
    this.closeMessageBox();
  }

  public addVisitedDate(){
    let visited_date = (<HTMLInputElement>document.getElementById("visited_date")).value;

    let today: Date = new Date();

    let difference =  Date.parse(today.toDateString()) - Date.parse(visited_date);

    if(difference <= 1209600000 && new Date(visited_date) <= today){
      this.closeMessageBox();
      this.map.createVisitedLocation(visited_date);
    }
    else{
      this.error = "You selected an invalid visited date. "
      this.error += "Make sure that the visited day you select is not older than two weeks, and "
      this.error += "that the day doesn't come after today.";
    }
  }

  public getMessageType(){ return MessageBoxComponent.type; }

}
