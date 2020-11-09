import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  public static message: string;
  private static element;

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
    this.element.style.display = "block";
    this.message = message;
  }

}
