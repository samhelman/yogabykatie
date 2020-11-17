import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FireService } from 'src/app/services/fire.service';
import { Output, EventEmitter } from '@angular/core';
import { FlashService } from 'src/app/flash-messages/flash.service';

@Component({
  selector: 'app-login-widget',
  templateUrl: './login-widget.component.html',
  styleUrls: ['./login-widget.component.css']
})
export class LoginWidgetComponent implements OnInit {

  public loginForm;
  public errorMessage: string;

  @Output() closeLoginEvent = new EventEmitter<boolean>();
  @Output() toggleLoginRegister = new EventEmitter<boolean>();

  constructor(
    private fire: FireService,
    private formBuilder: FormBuilder,
    private flash: FlashService
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  ngOnInit(): void {
  }

  close() {
    document.getElementById('grey').classList.add('fadeOut')
    setTimeout(
      () => {
        return this.closeLoginEvent.emit(false);
      },
      1000
    )
  }

  onSubmit(credentials) {
    this.fire.login(credentials).then(
      response => {
        this.close()
        this.flash.createMessage('Successfully logged in.', 'success')
      }
    ).catch(
      error => {
        console.log(error)
        this.errorMessage = error.message
        this.flash.createMessage('Failed to log in.', 'danger')
      }
    )
    this.loginForm.reset()
  }

  goToRegister() {
    return this.toggleLoginRegister.emit(true)
  }
}
