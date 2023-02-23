import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Subscription } from 'rxjs';

import {
  AuthService,
  UtilService
} from '@app/services';

import animations from './header.animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations
})
export class HeaderComponent implements OnDestroy {

  // is everything loaded and ready to be displayed
  isLoaded = false;

  isAuthenticated: boolean;
  userSub$: Subscription;

  constructor(
    private _router: Router,
    private _utilService: UtilService,
    private _authService: AuthService,
    private _fireAuth: AngularFireAuth
  ) {

    this.userSub$ = this._fireAuth.authState.subscribe(user => {
      this.isAuthenticated = true;
      // this.isAuthenticated = !!user;
      this.triggerAnimation();
    });
  }

  triggerAnimation() {
    this.isLoaded = true;
  }

  // TODO: block routes if logged in
  handleAuthButton(type: string) {
    const prevRoute = this._router.url;
    if (prevRoute.includes('auth/login') || prevRoute.includes('auth/register')) {
      // switch between forms when already on that route
      this._utilService.fireAuthButtonClicked(type);
    } else {
      this._router.navigate(['auth', type]);
    }
  }

  // log user out
  handleLogout() {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub$.unsubscribe();
  }

}
