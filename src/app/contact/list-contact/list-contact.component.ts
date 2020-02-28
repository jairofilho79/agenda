import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';

import { Contact } from '../contact';

import { SearchParams } from './search/searchParams';
import { RegisterComponent } from '../register/register.component';

import { ListContactService } from './list-contact.service';
import { UserService } from 'src/app/core/user/user.service';
import { ErrorHandlerService } from 'src/app/error/error-handler.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  contacts: Contact[]
  currentPage = 0;
  isSearching = false;
  isLoadingContacts = true;
  totalPages:number;
  userParams: SearchParams = <SearchParams> {};
  user;

  constructor(
    private listContactService: ListContactService,
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {

    this.userService.getUser().subscribe(user => this.user = user);

    this.listContactService
      .getContactsSubject()
      .subscribe(contacts => {this.contacts = contacts; this.currentPage = 0;})

    this.listContactService
      .getTotalPagesSubject()
      .subscribe(totalPages => this.totalPages = totalPages);

    this.isLoadingContacts = true;
      this.listContactService.goGetContacts()
        .then(() => this.isLoadingContacts = false)
        .catch(err => this.errorHandler.showErrors(err));
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
    this.isSearching = true;
    this.userParams = params;
    this.userParams['page'] = this.currentPage;
    this.listContactService.getContacts(this.userParams)
      .subscribe(res =>
        {
          this.isSearching = false;
          this.getResponseFromGetContacts(res)
        }
      )
  }

  addContact() {
    this.ngxSmartModalService
      .create('addContact', RegisterComponent)
      .open()
      .onAnyCloseEventFinished
      .subscribe((modal: NgxSmartModalComponent) => {

        modal.getData() && modal.getData().addContact &&
        this.listContactService
          .getContacts()
          .subscribe(
            (response:any) => {
              this.contacts = <Contact[]>response.data.content;
            },
            err => this.errorHandler.showErrors(err)
          )

        this.ngxSmartModalService.removeModal('addContact');
      })
  }

}
