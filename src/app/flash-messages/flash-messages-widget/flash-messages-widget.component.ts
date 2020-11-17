import { Component, OnInit } from '@angular/core';
import { FlashMessage } from '../flash-message-class';
import { FlashService } from '../flash.service';

@Component({
  selector: 'app-flash-messages-widget',
  templateUrl: './flash-messages-widget.component.html',
  styleUrls: ['./flash-messages-widget.component.css']
})
export class FlashMessagesWidgetComponent implements OnInit {

  public messages: Array<FlashMessage>;

  constructor(public flash: FlashService) { }

  ngOnInit(): void {
    this.getMessages()
  }

  getMessages() {
    this.messages = this.flash.messages;
  }

  dismiss(index: number) {
    this.messages.splice(index, 1)
  }

}
