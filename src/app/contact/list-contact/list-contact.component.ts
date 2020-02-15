import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ActivatedRoute } from '@angular/router';
import { ListContactService } from './list-contact.service';
import { SearchParams } from './search/searchParams';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  contacts:Contact[];
  currentPage:number = 0;
  totalPages:number;
  userParams: SearchParams = <SearchParams> {};

  constructor(
    private activatedRoute:ActivatedRoute,
    private listContactService: ListContactService
  ) { }

  ngOnInit() {

    this.contacts = this.activatedRoute.snapshot.data.contacts.data.content;
    this.totalPages = this.activatedRoute.snapshot.data.contacts.data.totalPages;
  }

  removeDeletedContact(index) {
    this.contacts.splice(index, 1)
  }

  previous() {
    if(this.currentPage <= 0) return;
    this.currentPage--;
    this.userParams.page = this.currentPage;
    this.listContactService.getContacts(this.userParams)
      .subscribe(res => this.getResponseFromGetContacts(res))
  }

  setPage(i:number) {
    if(i === this.currentPage) return;
    this.currentPage = i;
    this.userParams.page = this.currentPage;
    this.listContactService.getContacts(this.userParams)
      .subscribe(res => this.getResponseFromGetContacts(res))
  }

  forward() {
    if(this.currentPage >= this.totalPages-1 ) return;
    this.currentPage++;
    this.userParams.page = this.currentPage;
    this.listContactService.getContacts(this.userParams)
      .subscribe(res => this.getResponseFromGetContacts(res))
  }

  getResponseFromGetContacts(res) {
    const response = <any> res;
    this.contacts = <Contact[]> response.data.content;
    this.totalPages = response.data.totalPages;
  }

  setUserParams(params) {
    this.userParams = params;
    this.userParams['page'] = this.currentPage;
    this.listContactService.getContacts(this.userParams)
      .subscribe(res => this.getResponseFromGetContacts(res))
  }

}
