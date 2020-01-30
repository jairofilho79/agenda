import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Contact } from '../contact';
import { ListContactService } from './list-contact.service';
import { Injectable } from '@angular/core';

@Injectable( { providedIn: 'root' } )
export class ListContactResolver implements Resolve<Observable<Contact[]>>{

  constructor(private listContactService:ListContactService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact[]> | Observable<Observable<Contact[]>> | Promise<Observable<Contact[]>> {
    return this.listContactService.getContacts()
  }

}
