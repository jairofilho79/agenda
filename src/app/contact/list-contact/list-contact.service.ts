import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Contact } from '../contact';
import { SearchParams } from './search/searchParams';

@Injectable({providedIn: 'root'})
export class ListContactService {
  constructor(private http: HttpClient) {}

  // API = "http://localhost:3000"
  API = environment.API_URI;

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
