import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Contact } from '../contact';

@Injectable( { providedIn:'root' } )
export class RegisterService {
  API = "http://localhost:3000"
  constructor(private http: HttpClient) {}

  registerContact(contact:Contact) {
    return this.http.post(this.API+'/contact', contact)
  }

  validatePhone(p) {
    if(p === "") return null;

    const phone = parseInt(p.trim());

    if(phone === NaN) return false;

    if(phone.toString().length !== 10 && phone.toString().length !== 11) {
      return false;
    }

    return phone;

  }
}
