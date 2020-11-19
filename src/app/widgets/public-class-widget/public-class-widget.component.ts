import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlashService } from 'src/app/flash-messages/flash.service';
import { FireService } from 'src/app/services/fire.service';
import { YogaClass } from 'src/app/services/yoga-class.interface';

@Component({
  selector: 'app-public-class-widget',
  templateUrl: './public-class-widget.component.html',
  styleUrls: ['./public-class-widget.component.css']
})
export class PublicClassWidgetComponent implements OnInit {

  @Input() class: YogaClass;
  @Output() toggleLoginEvent = new EventEmitter<boolean>();

  public userUid: string;
  public joined: boolean;
  public date: string;
  public time: string;
  public joinMessage: string;

  constructor(
    private fire: FireService,
    private flash: FlashService
  ) { }

  ngOnInit(): void {
    this.userObservable()
    this.setDateTime()
  }

  userObservable() {
    this.fire.user.subscribe(
      response => {
        this.joinMessage = (response) ? 'Join Class' : 'Log In To Join';
        if (response) {
          this.userUid = response.uid
          this.scheduleObserver()
        }
      }
    )
  }

  scheduleObserver() {
    this.fire.getScheduleData(this.class.uid).subscribe(
      response => {
        if (response) {
          if (response['recipients'].includes(this.userUid)) {
            this.joined = true;
          } else {
            this.joined = false;
          }
        }
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
        let month = months[response['datetime'].toDate().getMonth()]
        let year = response['datetime'].toDate().getFullYear()
        this.date = `${day}, ${month} ${date}, ${year}`

        let hour = response['datetime'].toDate().getHours()
        let min = response['datetime'].toDate().getMinutes()
        if (min.toString().length == 1) {
          min = `0${min}`
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

  toggleJoined() {
    this.joined = !this.joined
  }

  joinClass() {
    this.fire.userIsAuthenticated().then(
      response => {
        if (response) {
          this.fire.joinClass(this.class.uid).then(
            response => {
              this.flash.createMessage('Successfully joined class. You should recieve an email 45 minutes before the class is scheduled to begin. If you do not, check your junk folder and then contact Katie!', 'success')
            }
          ).catch(
            error => {
              this.flash.createMessage('Something went wrong, please try again!', 'danger')
            }
          )
        } else {
          this.toggleLoginEvent.emit(true)
          this.flash.createMessage('You must be logged in to join a class!')
        }
      }
    )
  }

  leaveClass() {
    this.fire.leaveClass(this.class.uid).then(
      response => {
        this.flash.createMessage('Successfully left class.', 'success')
      }
    ).catch(
      error => {
        this.flash.createMessage('Something went wrong, please try again!', 'danger')
      }
    )
  }

}
