import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Contact } from '../contact';
import { SearchParams } from './search/searchParams';
import { BehaviorSubject } from 'rxjs';
import { User } from '../User';

@Injectable({providedIn: 'root'})
export class ListContactService {
  constructor(private http: HttpClient) {}

  contactsSubject = new BehaviorSubject<Contact[]>([]);
  usersSubject = new BehaviorSubject<User[]>([]);
  totalPagesSubject = new BehaviorSubject<number>(0);

  ADMIN = environment.ADMIN_ROLE;
  USER = environment.USER_ROLE;

  pathToGetContents = {
    [this.ADMIN]: "/user/all",
    [this.USER]: "/contact"
  }

  // API = "http://localhost:3000"
  API = environment.API_URI;

  getContactsSubject() {
    return this.contactsSubject.asObservable();
  }

  getUsersSubject() {
    return this.usersSubject.asObservable();
  }

  subjects = {
    [this.ADMIN]: this.usersSubject,
    [this.USER]: this.contactsSubject
  }

  subjectsObservables = {
    [this.ADMIN]: 'getUsersSubject',
    [this.USER]: 'getContactsSubject'
  }

  getSubject(role: string) {
    return eval(`this.${this.subjectsObservables[role]}()`);
  }

  getTotalPagesSubject() {
    return this.totalPagesSubject.asObservable();
  }

  goGet(role: string) {
    return new Promise((resolve, reject) => {
      this.get(role).subscribe(
        response => {
          if(response.data) {
            this.subjects[role].next(response.data.content);
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

  get(role: string, userParams: SearchParams = null) {
    let params = new HttpParams();

    if(userParams != null) {
      const keys = Object.keys(userParams);
      for (let key of keys) {
        if(!userParams[key]) continue;
        params = params.append(key, userParams[key]);
      }
    }
    return this.http.get<any>(this.API+this.pathToGetContents[role], { params })
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
