import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Contact } from '../contact';

@Injectable({providedIn: 'root'})
export class ListContactService {
  constructor(private http: HttpClient) {}

  API = "http://localhost:3000"

  getContacts() {
    return this.http.get<Contact[]>(this.API+"/contacts")
  }
}
