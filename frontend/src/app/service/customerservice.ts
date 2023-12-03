// customer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CoordinateService } from './coordinate.service';

@Injectable({
    providedIn: 'root', 
})
export class CustomerService {
    constructor(private http: HttpClient, private authService: AuthService, private coordinateService: CoordinateService) {}


    getHitData() {
        const authToken = this.authService.getAuthToken();

        if (authToken) {
            const headers = new HttpHeaders({
                'Authorization': `Bearer ${authToken}`,
            });

            return this.http.get<any>('http://localhost:24780/api/hit', { headers });
        } else {
            // Handle case where no token is available
            console.error('No authentication token available');
            return null;
        }
    }

    sendHit() {
        const authToken = this.authService.getAuthToken();
        const objects = this.coordinateService.getValues();
        
        if (authToken) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${authToken}`,
          });
      
          const requestOptions = { headers: headers };
          
          return this.http.post<any>('http://localhost:24780/api/hit', objects, requestOptions);
        } else {
          // Handle case where no token is available
          console.error('No authentication token available');
          return null;
        }
      }
      
}
