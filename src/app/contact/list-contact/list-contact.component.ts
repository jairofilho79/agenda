import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { Router } from '@angular/router';
import { ListContactService } from './list-contact.service';
import { SearchParams } from './search/searchParams';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';
import { RegisterComponent } from '../register/register.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/user/user.service';

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

  constructor(
    private listContactService: ListContactService,
    private userService: UserService,
    private router: Router,
    private toast: ToastrService,
    private ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {

    this.listContactService
      .getContactsSubject()
      .subscribe(contacts => this.contacts = contacts)

    this.listContactService
      .getTotalPagesSubject()
      .subscribe(totalPages => this.totalPages = totalPages);

    this.isLoadingContacts = true;
      this.listContactService.goGetContacts()
        .then(() => this.isLoadingContacts = false)
        .catch(
            (err) => {
            if(err.errors) {
              for(let error of err.errors) {
                this.toast.error(error, "Erro!");
              }
              return
            }
            if(Object.getPrototypeOf(err).constructor.name === "ProgressEvent" || err.status === 401) {
              this.toast
                .error("Por favor, faça o Login", "Erro!")
                .onHidden
                .subscribe(() => {
                  this.userService.logout()
                  this.router.navigate(['/', 'signin'])
                })
              return;
            }
            this.toast.error("Erro no servidor!", "Erro!");
            console.error(err)
          }
        );
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
            err => {
              if(err.errors) {
                for(let error of err.errors) {
                  this.toast.error(error, "Erro!");
                }
                return
              }
              if(Object.getPrototypeOf(err).constructor.name === "ProgressEvent" || err.status === 401) {
                this.toast
                  .error("Por favor, faça o Login", "Erro!")
                  .onHidden
                  .subscribe(() => {
                    this.userService.logout()
                    this.router.navigate(['/', 'signin'])
                  })
                return;
              }
              this.toast.error("Erro no servidor!", "Erro!");
              console.error(err)
            }
          )

        this.ngxSmartModalService.removeModal('addContact');
      })
  }

}
