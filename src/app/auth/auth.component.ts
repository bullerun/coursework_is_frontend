// auth.component.ts
import {Component, signal} from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from "../service/auth.service";

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    styleUrl: "./app.component.css",
    templateUrl: "./auth.component.html",
})
export class AuthComponent {
    isLogin = signal(true);
    errorMessage = '';
    form: FormGroup;


    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {

        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.email]]
        });
    }

    onSubmit() {
        if (this.form.invalid) return;
        const formData = this.form.getRawValue();

        if (this.isLogin()) {
            this.authService.login({
                username: formData.username!,
                password: formData.password!
            }).subscribe({
                next: () => this.router.navigate(['/']),
                error: (err) => this.errorMessage = err.message || 'Unknown error occurred'
            });
        } else {
            this.authService.register({
                username: formData.username!,
                email: formData.email!,
                password: formData.password!
            }).subscribe({
                next: () => this.router.navigate(['/']),
                error: (err) => this.errorMessage = err.message || 'Unknown error occurred'
            });
        }
    }
}
