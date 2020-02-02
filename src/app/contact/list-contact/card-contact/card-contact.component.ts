import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Contact } from '../../contact';
import { ListContactService } from '../list-contact.service';
import { RegisterService } from '../../register/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-contact',
  templateUrl: './card-contact.component.html',
  styleUrls: ['./card-contact.component.css']
})
export class CardContactComponent implements OnInit {

  @Input() contact:Contact;
  @Output() deleteContactEvent = new EventEmitter()
  editContactObj:any = {}
  isEditing:boolean = false;
  isSaving:boolean = false;
  isDeleting:boolean = false;

  constructor(
    private listContactService:ListContactService,
    private registerService:RegisterService,
    private toast:ToastrService
    ) { }

  ngOnInit() {}

  editContact() {
    this.isEditing = true;
  }

  cancelEditContact() {
    this.isEditing = false;
  }

  saveContact() {
    this.isSaving = true;
    const phone = (<HTMLInputElement>document.querySelector("#phone"))

    this.editContactObj.id = this.contact.id;
    this.editContactObj.name = (<HTMLInputElement>document.querySelector("#name")).value
    this.editContactObj.email = (<HTMLInputElement>document.querySelector("#email")).value
    this.editContactObj.phone = this.registerService.validatePhone(phone.value)

    if(this.editContactObj.phone === false) {
      phone.focus();
      this.isSaving = false;
      this.toast.error('Telefone inválido', 'Erro!')
      return;
    }

    this.listContactService.editContact(this.editContactObj)
    .subscribe(
      response => {
        this.contact = response.data;
        this.isSaving = false;
        this.isEditing = false;
        this.toast.success('Contato alterado!', 'Sucesso!')
      },
      err => {
        this.isSaving = false;
        for(let error of err.errors) {
          this.toast.error(error, "Erro!");
        }
      }
    )
  }

  deleteContact() {
    this.isDeleting = true;

    this.listContactService.deleteContact(this.contact.id)
      .subscribe((response:any) => {
        if(response.errors) {
          for(let error of response.errors) {
            this.toast.error(error);
            return;
          }
        }
        this.deleteContactEvent.emit("");
        this.isDeleting = false;
        this.toast.success('Contato excluído!', 'Sucesso!')
      })
  }

}
