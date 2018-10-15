import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styles: ['em {float:right; color:#E05C65; padding-left:10px;}']
})
export class LoginComponent {
    username: string;
    password: string;
    mouseoverLogin: boolean;
    loginInvalid = false;

    constructor(private authService: AuthService, private router: Router) {
    }

    cancel() {
        this.router.navigate(['events']);
    }

    login(formValues) {
        this.authService.loginUser(formValues.userName, formValues.password).subscribe(response => {
            if (!response) {
                this.loginInvalid = true;
            } else {
                this.loginInvalid = false;
                this.router.navigate(['events']);
            }
        });
    }
}
