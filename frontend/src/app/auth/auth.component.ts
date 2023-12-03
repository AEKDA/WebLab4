// auth.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  username: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient ) {}

  login() {
    const credentials = { login: this.username, passwd: this.password };
    this.http.post('http://localhost:24780/api/auth/login', credentials).subscribe(
      (response: any) => {
        if (response.token) {
          this.authService.setAuthenticated(true, response.token);
          this.router.navigate(['/main']);
        } else {
          console.error('Authentication failed:', response);
        }
      },
      (error) => {
        console.error('Authentication error:', error);
      }
    );
  }
}
