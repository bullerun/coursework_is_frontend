import {Component} from '@angular/core';
import {UserService} from '../service/user.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule
  ],
  templateUrl: './auth.component.html',
  standalone: true,
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  email = '';
  password = '';
  isLoginMode = true;

  constructor(private userService: UserService) {
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin(event: Event) {
    event.preventDefault();
    this.userService.login({email: this.email, password: this.password}).subscribe(response => {
      console.log('Login successful:', response);
    });
  }

  onRegister(event: Event) {
    event.preventDefault();
    this.userService.register({email: this.email, password: this.password}).subscribe(response => {
      console.log('Registration successful:', response);
    });
  }
}
