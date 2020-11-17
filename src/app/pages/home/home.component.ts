import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';
import { YogaClass } from 'src/app/services/yoga-class.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userAuthenticated: boolean;
  public classes: Array<YogaClass> = [];
  public loginWidget: boolean = false;
  public registerWidget: boolean = false;

  constructor(private fire: FireService) { }

  ngOnInit(): void {
    this.userObservable();
    this.classObservable();
  }

  userObservable() {
    this.fire.user.subscribe(
      response => {
        this.userAuthenticated = (response) ? true : false;
      }
    )
  }

  classObservable() {
    this.fire.getScheduledClasses().subscribe(
      response => {
        this.classes = [];
        response.map(
          el => {
            let now = new Date();
            let classTime = el['datetime'].toDate()
            if (now < classTime) {
              let yogaClass: YogaClass = {
                uid: el['uid'],
                name: el['name'],
                description: el['description'],
                datetime: el['datetime']
              }
              if (!this.classes.includes(yogaClass)) {
                this.classes.push(yogaClass)
              }
            }
          }
        )
      }
    )
  }

  toggleLogin() {
    this.loginWidget = !this.loginWidget;
  }

  toggleRegister() {
    this.registerWidget = !this.registerWidget;
  }

  toggleLoginRegister() {
    this.toggleLogin()
    this.toggleRegister()
  }

  login() {
    return this.loginWidget = true;
  }

  register() {
    return this.registerWidget = true;
  }

}
