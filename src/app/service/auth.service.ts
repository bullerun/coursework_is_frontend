import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {of, Observable} from 'rxjs';

export interface AuthResponse {
  id: string;
  username: string;
  token: string;
  role: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private apiUrl = 'http://localhost:11488/auth'
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  register(userData: { username: string; email: string; password: string }): Observable<AuthResponse | ErrorResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => of(error.error))
    );
  }

  login(credentials: { username: string; password: string }): Observable<AuthResponse | ErrorResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => of(error.error))
    );
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem('authToken', response.token);
    this.router.navigate(['/']);
  }

  private handleError(response: ErrorResponse): void {
    alert(response.message)
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
