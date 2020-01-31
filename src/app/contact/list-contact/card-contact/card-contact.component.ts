import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Contact } from '../../contact';
import { ListContactService } from '../list-contact.service';
import { RegisterService } from '../../register/register.service';

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
    private registerService:RegisterService
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
      alert('Telefone inválido')
      return;
    }

    this.listContactService.editContact(this.editContactObj).subscribe(contact => {
      this.contact = contact;
      this.isEditing = false;
      alert('Contato alterado com sucesso!')
    })
  }

  deleteContact() {
    this.listContactService.deleteContact(this.contact.id)
      .subscribe(() => {
        this.deleteContactEvent.emit("");
        alert('Contato excluído com sucesso!')
      })
  }

}
