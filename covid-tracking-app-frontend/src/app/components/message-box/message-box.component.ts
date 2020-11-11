import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  public static message: string;
  private static element;
  private static type; //1 - display message, 2 - confirmation message 
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

  public doAction(){
    MessageBoxComponent.action();
    this.closeMessageBox();
  }

  public getMessageType(){ return MessageBoxComponent.type; }

}
