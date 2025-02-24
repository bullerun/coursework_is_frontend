import {Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {inject} from '@angular/core';
import {UserService} from './service/user.service';
import {map} from 'rxjs';
import {OrganizationComponent} from './organization/organization.component';
import {TenderComponent} from './tender/tender.component';
import {BidComponent} from './bid/bid.component';
import {RoleRequestComponent} from './role.request/role.request.component';
import {InvitesComponent} from './organization/invites/invites.component';

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
  },
  {
    path: "organization",
    component: OrganizationComponent,
  },
  {
    path: "organization/invite",
    component: InvitesComponent,
  },
  {
    path: "tender",
    component: TenderComponent,
  },
  {
    path: "bid",
    component: BidComponent,
  },
  {
    path: "role-request",
    component: RoleRequestComponent,
  }
];
