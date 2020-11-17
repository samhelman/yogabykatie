import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FlashService } from 'src/app/flash-messages/flash.service';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-register-widget',
  templateUrl: './register-widget.component.html',
  styleUrls: ['./register-widget.component.css']
})
export class RegisterWidgetComponent implements OnInit {

  public registerForm;
  public errorMessage: string;

  @Output() closeRegisterEvent = new EventEmitter<boolean>();
  @Output() toggleLoginRegister = new EventEmitter<boolean>();

  constructor(
    private fire: FireService,
    private formBuilder: FormBuilder,
    private flash: FlashService
  ) {
    this.registerForm = this.formBuilder.group({
      email: '',
      password: '',
      confirm: ''
    })
  }

  ngOnInit(): void {
  }

  close() {
    document.getElementById('grey').classList.add('fadeOut')
    setTimeout(
      () => {
        return this.closeRegisterEvent.emit(false);
      },
      1000
    )
  }

  onSubmit(credentials) {
    if (credentials.password == credentials.confirm) {
        this.fire.register(credentials).then(
          response => {
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
          }
        ).catch(
          error => {
            console.log(error)
            this.errorMessage = error.message
            this.flash.createMessage('Something went wrong, please try again!', 'danger')
          }
        )
        this.registerForm.reset()
      } else {
        this.errorMessage = 'The passwords did not match!'
        this.flash.createMessage('Something went wrong, please try again!', 'danger')
      }
    }

  goToLogin() {
    return this.toggleLoginRegister.emit(true)
  }

}
