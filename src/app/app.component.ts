import { Component } from '@angular/core';
import { fadeAnimation } from './animations/animations';
import { FireService } from './services/fire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'YogaByKatie';

  constructor(private fire: FireService) { }

  getLoggedInUser() {
    return this.fire.user;
  }
}
