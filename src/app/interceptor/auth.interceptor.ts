import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {JwtService} from "../service/jwt.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(JwtService).getToken();
  const cloned = token
    ? req.clone({setHeaders: {Authorization: `Bearer ${token}`}})
    : req;

  return next(cloned);
};
