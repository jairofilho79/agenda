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
  isEditing:boolean = false;
  editContactObj:any = {}

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
    const phone = (<HTMLInputElement>document.querySelector("#phone"))

    this.editContactObj.id = this.contact.id;
    this.editContactObj.name = (<HTMLInputElement>document.querySelector("#name")).value
    this.editContactObj.email = (<HTMLInputElement>document.querySelector("#email")).value
    this.editContactObj.phone = this.registerService.validatePhone(phone.value)

    if(this.editContactObj.phone === false) {
      phone.focus();
      this.toast.warning('Telefone inválido', 'Atenção!')
      return;
    }

    this.listContactService.editContact(this.editContactObj).subscribe(response => {
      if(response.errors !== null) {throw new Error(response.errors)}
      this.contact = response.data;
      this.isEditing = false;
      this.toast.success('Contato alterado!', 'Sucesso!')
    })
  }

  deleteContact() {
    this.listContactService.deleteContact(this.contact.id)
      .subscribe(() => {
        this.deleteContactEvent.emit("");
        this.toast.success('Contato excluído!', 'Sucesso!')
      })
  }

}
