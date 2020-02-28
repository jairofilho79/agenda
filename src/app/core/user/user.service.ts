import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new BehaviorSubject<any>(undefined);
  userRole: string;

  constructor(
    private tokenService:TokenService
  ) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  getUserRole() {
    return this.userRole;
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
    this.userRole = undefined;
  }

  decodeAndNotify() {
    const user = jwt_decode(this.tokenService.getToken());
    this.userRole = user.role;
    this.userSubject.next(user);
  }

}
