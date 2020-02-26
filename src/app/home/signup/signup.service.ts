import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient
  ) { }

  signup(user: any) {
    return this.http.post(environment.API_URI+'/user', user)
  }
}
