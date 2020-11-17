export class FlashMessage {
  message: string;
  dismissed: boolean = false;
  style?: string;

  constructor(message, style?) {
    this.message = message;
    this.style = style || 'info';
    setTimeout(() => this.dismissed = true, 10000)
  }

  dismiss() {
    this.dismissed = true
  }
}