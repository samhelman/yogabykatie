import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';
import { YogaClass } from 'src/app/services/yoga-class.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public classes: Array<YogaClass> = [];

  constructor(private fire: FireService) { }

  ngOnInit(): void {
    this.classObservable()
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

}
