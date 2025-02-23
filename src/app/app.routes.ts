import { Routes } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {inject} from '@angular/core';
import {UserService} from './service/user.service';
import {map} from 'rxjs';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
  {
    path: "register",
    component: AuthComponent,
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  }
];
