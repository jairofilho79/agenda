import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Contact } from '../contact';
import { SearchParams } from './search/searchParams';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ListContactService {
  constructor(private http: HttpClient) {}

  contactsSubject = new BehaviorSubject<Contact[]>([]);
  totalPagesSubject = new BehaviorSubject<number>(0);

  // API = "http://localhost:3000"
  API = environment.API_URI;

  getContactsSubject() {
    return this.contactsSubject.asObservable();
  }

  getTotalPagesSubject() {
    return this.totalPagesSubject.asObservable();
  }

  goGetContacts() {
    return new Promise((resolve, reject) => {
      this.getContacts().subscribe(
        response => {
          if(response.data) {
            this.contactsSubject.next(response.data.content);
            this.totalPagesSubject.next(response.data.totalPages);
            resolve()
          }
        },
        err => {
          reject(err);
        }
      )
    })


  }

  getContacts(userParams: SearchParams = null) {
    let params = new HttpParams();

    if(userParams != null) {
      const keys = Object.keys(userParams);
      for (let key of keys) {
        if(!userParams[key]) continue;
        params = params.append(key, userParams[key]);
      }
    }
    return this.http.get<any>(this.API+"/contact", { params })
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
