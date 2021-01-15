import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlashService } from 'src/app/flash-messages/flash.service';
import { FireService } from 'src/app/services/fire.service';
import { YogaClass } from 'src/app/services/yoga-class.interface';

@Component({
  selector: 'app-add-class-widget',
  templateUrl: './add-class-widget.component.html',
  styleUrls: ['./add-class-widget.component.css']
})
export class AddClassWidgetComponent implements OnInit {

  public opened: boolean;
  public addClassForm;
  public years: Array<number>;
  public months: Array<Object>;
  public dates: Array<number>;
  public hours: Array<number>;
  public mins: Array<Object>;
  public errorMessage: string;

  constructor(
    private fire: FireService,
    private formBuilder: FormBuilder,
    private flash: FlashService
  ) {
    this.addClassForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      zoomLink: [null, [Validators.required]],
      zoomId: [null, [Validators.required]],
      spotifyLink: [null, [Validators.required]],
      description: [null],
      dateYear: [null, [Validators.required]],
      dateMonth: [null, [Validators.required]],
      dateDate: [null, [Validators.required]],
      timeHour: [null, [Validators.required]],
      timeMins: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.years = this.getYears();
    this.months = this.getMonths();
    this.dates = this.getDates();
    this.hours = this.getHours();
    this.mins = this.getMins();
  }

  toggleOpen() {
    this.opened = !this.opened;
    this.errorMessage = ''
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

  onSubmit(value) {
    let now = new Date()
    let classDate = new Date(value.dateYear, value.dateMonth, value.dateDate, value.timeHour, value.timeMins)
    if (now < classDate) {
      let uid = this.fire.generateClassUid()
      let newClass: YogaClass = {
        uid: uid,
        zoomLink: value.zoomLink,
        zoomId: value.zoomId,
        spotifyLink: value.spotifyLink,
        description: value.description,
        name: value.name,
        datetime: classDate,
        estTime: classDate.toString()
      }
      this.fire.addClass(newClass).then(
        () => {
          this.flash.createMessage('Sucessfully added class!', 'success')
          this.addClassForm.reset()
          this.toggleOpen()
        }
      ).catch(
        error => {
          this.flash.createMessage('Something went wrong, please try again!', 'danger')
          this.errorMessage = error.message
        }
      )
    } else {
      this.flash.createMessage('Something went wrong, please try again!', 'danger')
      this.errorMessage = 'Cannot create a class in the past!'
    }
  }

}
