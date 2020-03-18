import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';

import { environment } from 'src/environments/environment';

import { Contact } from '../contact';

import { SearchParams } from './search/searchParams';
import { RegisterComponent } from '../register/register.component';

import { ListContactService } from './list-contact.service';
import { UserService } from 'src/app/core/user/user.service';
import { ErrorHandlerService } from 'src/app/error/error-handler.service';
import { User } from '../User';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  contents: Contact[] | User[]
  currentPage = 0;
  isSearching = false;
  isLoadingContacts = true;
  totalPages:number;
  userParams: SearchParams = <SearchParams> {};
  user;
  ADMIN = environment.ADMIN_ROLE;
  USER = environment.USER_ROLE;

  constructor(
    private listContactService: ListContactService,
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {

    this.userService
      .getUser()
      .subscribe(user => {
        this.user = user;

        this.listContactService
          .getSubject(this.user.role)
          .subscribe(contents => {
            this.contents = contents;
            this.currentPage = 0;
          })

        this.listContactService.goGet(this.user.role)
          .then(() => {this.isLoadingContacts = false})
          .catch(err => this.errorHandler.showErrors(err));

      });

    this.listContactService
      .getTotalPagesSubject()
      .subscribe(totalPages => this.totalPages = totalPages);

    this.isLoadingContacts = true;
  }

  removeDeletedContact(index) {
    this.contents.splice(index, 1)
  }

  previous() {
    if(this.currentPage <= 0) return;
    this.currentPage--;
    this.userParams.page = this.currentPage;
    this.listContactService.get(this.user.role, this.userParams)
      .subscribe(res => this.getResponseFromGetContacts(res))
  }

  setPage(i:number) {
    if(i === this.currentPage) return;
    this.currentPage = i;
    this.userParams.page = this.currentPage;
    this.listContactService.get(this.user.role,this.userParams)
      .subscribe(res => this.getResponseFromGetContacts(res))
  }

  forward() {
    if(this.currentPage >= this.totalPages-1 ) return;
    this.currentPage++;
    this.userParams.page = this.currentPage;
    this.listContactService.get(this.user.role,this.userParams)
      .subscribe(res => this.getResponseFromGetContacts(res))
  }

  getResponseFromGetContacts(res) {
    const response = <any> res;
    this.contents = <Contact[] | User[]> response.data.content;
    this.totalPages = response.data.totalPages;
  }

  setUserParams(params) {
    this.isSearching = true;
    this.userParams = params;
    this.userParams['page'] = this.currentPage;
    this.listContactService.get(this.user.role, this.userParams)
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

        modal.getData()
        && modal.getData().addContact
        && this.listContactService
          .get(this.user.role)
          .subscribe(
            (response:any) => {
              this.contents = <Contact[] | User[]>response.data.content;
            },
            err => this.errorHandler.showErrors(err)
          )

        this.ngxSmartModalService.removeModal('addContact');
      })
  }

}
