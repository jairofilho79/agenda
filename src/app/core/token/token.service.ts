import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  KEY = 'authToken';

  constructor() { }

  hasToken() {
    return !!this.getToken();
  }

  getToken() {
    return window.localStorage.getItem(this.KEY);
  }

  setToken(token) {
    try {
      window.localStorage.setItem(this.KEY, token)
      return true;
    } catch(e) {
      console.error(e)
      return false;
    }
  }

  removeToken() {
    try {
      window.localStorage.removeItem(this.KEY);
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }
  }
}
