import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Contact } from '../../contact';
import { ListContactService } from '../list-contact.service';
import { ToastrService } from 'ngx-toastr';
import { Snippets } from 'src/shared/Snippets';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-contact',
  templateUrl: './card-contact.component.html',
  styleUrls: ['./card-contact.component.css']
})
export class CardContactComponent implements OnInit {

  @Input() contact:Contact;
  @Output() deleteContactEvent = new EventEmitter()
  isEditing:boolean = false;
  isSaving:boolean = false;
  isDeleting:boolean = false;
  editForm:FormGroup;

  constructor(
    private listContactService:ListContactService,
    private toast:ToastrService,
    private formBuilder:FormBuilder
    ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: [this.contact.name],
      phone: [
        Snippets.buildPhoneMask(
          Snippets.onlyTelefoneNumbers(
            ''+this.contact.phone
          )
        )
      ],
      email: [this.contact.email ? this.contact.email : '']
    })
  }

  editContact() {
    this.isEditing = true;
  }

  cancelEditContact() {
    this.isEditing = false;
  }

  saveContact() {
    this.isSaving = true;

    let formValue = <Contact>this.editForm.getRawValue()

    formValue.id = this.contact.id;
    formValue.phone = Snippets.onlyTelefoneNumbers(formValue.phone);

    this.listContactService.editContact(formValue)
    .subscribe(
      response => {
        this.contact = response.data;
        this.isSaving = false;
        this.isEditing = false;
        this.toast.success('Contato alterado!', 'Sucesso!')
      },
      err => {
        this.isSaving = false;
        if(err.errors) {
          for(let error of err.errors) {
            this.toast.error(error, "Erro!");
          }
          return
        }
        this.toast.error("Erro no servidor!", "Erro!");
        console.error(err)
      }
    )
  }

  deleteContact() {
    this.isDeleting = true;

    this.listContactService.deleteContact(this.contact.id)
      .subscribe(
        () => {
          this.deleteContactEvent.emit("");
          this.isDeleting = false;
          this.toast.success('Contato excluído!', 'Sucesso!')
        },
        err => {
          this.isDeleting = false;
          if(err.errors) {
            for(let error of err.errors) {
              this.toast.error(error, "Erro!");
            }
            return
          }
          this.toast.error("Erro no servidor!", "Erro!");
          console.error(err)
        }
      )
  }

}
