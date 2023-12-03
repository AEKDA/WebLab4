// auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private authTokenKey = 'authToken'; // Key for local storage
  private authToken: string | null = null;

  constructor() {
    // Check if the token exists in local storage on service initialization
    const storedToken = localStorage.getItem(this.authTokenKey);
    if (storedToken) {
      this.setAuthenticated(true, storedToken);
    }
  }

  setAuthenticated(value: boolean, token: string | null = null): void {
    this.isAuthenticatedSubject.next(value);
    this.authToken = token;

    // Store the token in local storage
    if (token) {
      localStorage.setItem(this.authTokenKey, token);
    } else {
      // Remove the token from local storage if null
      localStorage.removeItem(this.authTokenKey);
    }
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getAuthToken(): string | null {
    return this.authToken;
  }
}
