import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new BehaviorSubject<any>(undefined)

  constructor(
    private tokenService:TokenService
  ) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token:string) {
    this.tokenService.setToken(token)
    this.decodeAndNotify()
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(undefined);
  }

  decodeAndNotify() {
    this.userSubject.next(jwt_decode(this.tokenService.getToken()));
  }

}
