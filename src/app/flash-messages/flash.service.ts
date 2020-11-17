import { Injectable } from '@angular/core';
import { FlashMessage } from './flash-message-class';

@Injectable({
  providedIn: 'root'
})
export class FlashService {

  public messages: Array<FlashMessage> = [];

  constructor() { }

  createMessage(message: string, style?: string) {
    this.messages.push(
      new FlashMessage(message, style)
    )
  }

}
