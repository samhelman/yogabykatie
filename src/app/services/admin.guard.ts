import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { FlashService } from '../flash-messages/flash.service';
import { FireService } from './fire.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private fire: FireService, private router: Router, private flash: FlashService) {}

  canActivate(next, state): Observable<boolean> {
    return this.fire.user.pipe(
      map(user => (user) ? user.admin : null),
      tap(admin => {
        if (!admin) {
          this.flash.createMessage('You must be logged in as an admin to access the admin page!', 'danger')
          this.router.navigate(['classes'])
        }
      })
    )
  }
}
