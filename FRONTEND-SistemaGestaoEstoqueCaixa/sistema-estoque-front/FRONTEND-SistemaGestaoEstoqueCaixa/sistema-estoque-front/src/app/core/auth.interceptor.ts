import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../environments/environment';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  
  const authService = inject(AuthService);
  const apiUrl = environment.apiUrl;
  const token = authService.getAuthToken();
  if (token && request.url.startsWith(apiUrl)) {
    request = request.clone({
      setHeaders: {
        Authorization: token
      }
    });
  }
  return next(request);
};