import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  authenticate(email: string, password: string) {
    const headers =  new HttpHeaders().append('Content-Type', 'application/json')
      return this.http
        .post(
          `${environment.API_URI}/auth`,
          { email, password },
          { headers }
        )
  }
}
