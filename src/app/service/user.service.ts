import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {distinctUntilChanged, tap} from 'rxjs/operators';
import {Observable, BehaviorSubject, map} from 'rxjs';
import {User} from "../model/user.model";
import {JwtService} from "./jwt.service";

@Injectable({providedIn: 'root'})
export class UserService {
  private apiUrl = 'http://localhost:11488/auth'
  storedUser = window.localStorage["jwtToken"];

  constructor(private http: HttpClient, private router: Router, private readonly jwtService: JwtService) {
  }

  private initialUser = this.storedUser ? this.storedUser : null;

  private currentUserSubject = new BehaviorSubject<User | null>(this.initialUser);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));


  register(userData: { username: string; email: string; password: string }): Observable<User | Error> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData).pipe(
      tap(user => this.handleAuthSuccess(user))
    )
  }

  login(credentials: { username: string; password: string }): Observable<User | Error> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => this.handleAuthSuccess(user))
    )
  }

  private handleAuthSuccess(user: User): void {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    void this.router.navigate(['/']);
  }


  logout(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
    void this.router.navigate(['/login']);
  }
}
