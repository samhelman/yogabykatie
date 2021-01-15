import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';
import { YogaClass } from 'src/app/services/yoga-class.interface';

@Component({
  selector: 'app-admin-class-widget',
  templateUrl: './admin-class-widget.component.html',
  styleUrls: ['./admin-class-widget.component.css']
})
export class AdminClassWidgetComponent implements OnInit {

  @Input() class: YogaClass;

  public date: string;
  public time: string;
  public opened: boolean;
  public deletePrompt: boolean = false;
  public errorMessage: string;

  //template data
  public years: Array<number>;
  public months: Array<Object>;
  public dates: Array<number>;
  public hours: Array<number>;
  public mins: Array<Object>;

  //class content fields
  public updateName: string;
  public updateZoomLink: string;
  public updateZoomId: string;
  public updateSpotifyLink: string;
  public updateDescription: string;
  public updateDateYear: number;
  public updateDateMonth: number;
  public updateDateDate: number;
  public updateTimeHour: number;
  public updateTimeMins: number;
  public attendees: Array<string> = [];

  constructor(private fire: FireService) { }

  ngOnInit(): void {
    this.years = this.getYears();
    this.months = this.getMonths();
    this.dates = this.getDates();
    this.hours = this.getHours();
    this.mins = this.getMins();
    this.setDateTime()
    this.getAttendees();
  }

  getAttendees() {

    this.fire.getScheduleData(this.class.uid).subscribe(
      response => {
        response['recipients'].forEach(
          uid => {
            this.fire.getUserByUid(uid).subscribe(
              response => {
                this.attendees.push(response['email'])
              }
            )
          }
        )
      }
    )
  }

  setDateTime() {
    this.fire.getClassByUid(this.class.uid).subscribe(
      response => {
        let days = [
          'Sun',
          'Mon',
          'Tues',
          'Wed',
          'Thurs',
          'Fri',
          'Sat'
        ]
        let months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
        let day = days[response['datetime'].toDate().getDay()]
        let date = response['datetime'].toDate().getDate()
        let monthIndex = response['datetime'].toDate().getMonth()
        let month = months[monthIndex]
        let year = response['datetime'].toDate().getFullYear()
        this.date = `${day}, ${month} ${date}, ${year}`

        let hour = response['datetime'].toDate().getHours()
        let min = response['datetime'].toDate().getMinutes()

        //set update fields
        this.updateName = response['name']
        this.updateZoomLink = response['zoomLink']
        this.updateZoomId = response['zoomId']
        this.updateSpotifyLink = response['spotifyLink']
        this.updateDescription = response['description']
        this.updateDateYear = year
        this.updateDateMonth = monthIndex
        this.updateDateDate = date
        this.updateTimeHour = hour
        this.updateTimeMins = min

        //set display fields
        if (min.toString().length == 1) {
          min = `0${min}`
        } else {
          min = min.toString()
        }
        let ampm
        if (hour > 12) {
          hour -= 12
          ampm = 'PM'
        } else if (hour == 12) {
          ampm = 'Noon'
        } else if (hour == 24) {
          ampm = 'Midnight'
        } else {
          ampm = 'AM'
        }
        this.time = `${hour}:${min} ${ampm}`
      }
    )
  }

  toggleOpen() {
    this.opened = !this.opened;
  }

  toggleDeletePrompt() {
    this.deletePrompt = !this.deletePrompt;
  }

  updateClass() {
    let now = new Date();
    let newDateTime = new Date(this.updateDateYear, this.updateDateMonth, this.updateDateDate, this.updateTimeHour, this.updateTimeMins);
    if (now < newDateTime) {
      let yogaClass: YogaClass = {
        uid: this.class.uid,
        name: this.updateName,
        description: this.updateDescription,
        datetime: newDateTime,
        estTime: newDateTime.toString(),
        zoomId: this.updateZoomId,
        zoomLink: this.updateZoomLink,
        spotifyLink: this.updateSpotifyLink,
      }
      this.fire.updateClass(yogaClass)
    } else {
      this.errorMessage = 'You cannot have a class in the past!'
    }
  }

  deleteClass() {
    this.fire.deleteClass(this.class.uid)
  }

  getYears() {
    return [
      2020,
      2021,
      2022
    ]
  }

  getMonths() {
    return [
      { name: 'Jan', index: 0},
      { name: 'Feb', index: 1},
      { name: 'Mar', index: 2},
      { name: 'Apr', index: 3},
      { name: 'May', index: 4},
      { name: 'Jun', index: 5},
      { name: 'Jul', index: 6},
      { name: 'Aug', index: 7},
      { name: 'Sep', index: 8},
      { name: 'Oct', index: 9},
      { name: 'Nov', index: 10},
      { name: 'Dec', index: 11}
    ];
  }

  getDates() {
    return [
      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
    ];
  }

  getHours() {
    return [
      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24
    ];
  }

  getMins() {
    return [
      { name: '00', value: 0 },
      { name: '15', value: 15 },
      { name: '30', value: 30 },
      { name: '45', value: 45 }
    ];
  }

}
