import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {UserService} from '../service/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const token = userService.getToken();

  const cloned = token
    ? req.clone({setHeaders: {Authorization: `Bearer ${token}`}})
    : req;

  return next(cloned);
};
