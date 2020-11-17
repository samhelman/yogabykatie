import { Component, Input, OnInit } from '@angular/core';
import { FlashService } from 'src/app/flash-messages/flash.service';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-account-info-widget',
  templateUrl: './account-info-widget.component.html',
  styleUrls: ['./account-info-widget.component.css']
})
export class AccountInfoWidgetComponent implements OnInit {

  public loggedInUser: string;
  public admin: boolean;
  public selected: boolean;
  public deletePrompt: boolean = false;

  constructor(
    private fire: FireService,
    private flash: FlashService
  ) { }

  ngOnInit(): void {
    this.userObservable()
  }

  userObservable() {
    this.fire.user.subscribe(
      response => {
        this.loggedInUser = (response) ? response.email : null;
        this.admin = (response) ? response.admin : false;
      }
    )
  }

  toggleSelect() {
    this.selected = !this.selected;
  }

  logout() {
    this.toggleSelect()
    this.fire.logout().then(
      response => {
        this.flash.createMessage(
          'You successfully logged out.',
          'success'
        )
      }
    ).catch(
      error => {
        this.flash.createMessage(
          'Something went wrong, please try again!',
          'danger'
        )
      }
    )
  }

  toggleDeletePrompt() {
    this.deletePrompt = !this.deletePrompt;
    this.selected = false;
  }

  deleteUser() {
    this.fire.deleteUser().then(
      () => {
        this.flash.createMessage('Account was successfully deleted.', 'success')
        this.toggleDeletePrompt()
      }
    ).catch(
      error => {
        this.flash.createMessage(error, 'danger')
      }
    )
  }

}
