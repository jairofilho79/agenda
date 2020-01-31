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

  editContact(contact:Contact) {
    return this.http.put<Contact>(this.API+'/contact/'+contact.id, contact)
  }

  deleteContact(id:number) {
    return this.http.delete<Contact>(this.API+'/contact/'+id)
  }
}
