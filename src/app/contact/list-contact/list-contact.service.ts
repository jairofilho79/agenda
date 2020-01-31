import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Contact } from '../contact';

@Injectable({providedIn: 'root'})
export class ListContactService {
  constructor(private http: HttpClient) {}

  // API = "http://localhost:3000"
  API = "https://jns-agenda-api.herokuapp.com"

  getContacts() {
    return this.http.get<Contact[]>(this.API+"/contact/contacts")
  }

  editContact(contact:Contact) {
    const headers = new HttpHeaders()
    headers.set("Content-Type", "application/json")
    // headers.set("Access-Control-Allow-Origin", "*")

    return this.http.put<any>(this.API+'/contact/', contact, { headers })
  }

  deleteContact(id:number) {
    const headers = new HttpHeaders()
    // headers.set("Content-Type", "application/json")
    // headers.set("Access-Control-Allow-Origin", "*")

    return this.http.delete<Contact>(this.API+'/contact/'+id, { headers })
  }
}
