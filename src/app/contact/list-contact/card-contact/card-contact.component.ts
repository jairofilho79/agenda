import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';

import { Contact } from '../../contact';

import { ListContactService } from '../list-contact.service';

import { Snippets } from 'src/shared/Snippets';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { UserService } from 'src/app/core/user/user.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/error/error-handler.service';

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
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private toast:ToastrService,
    private formBuilder:FormBuilder,
    private ngxSmartModalService: NgxSmartModalService
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
        this.errorHandler.showErrors(err);
      }
    )
  }

  confirmDeleteContact() {
    this.ngxSmartModalService.create(
      'deleteContact',
      ConfirmDeleteComponent,
      {
        customClass: "nsm-centered nsm-dialog-animation-ttb"
      }
    )
      .open()
      .onAnyCloseEventFinished
      .subscribe(
        (modal: NgxSmartModalComponent) => {
          modal.getData() && modal.getData().deleteContact && this.deleteContact();
          this.ngxSmartModalService.removeModal('deleteContact');
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
          this.errorHandler.showErrors(err);
        }
      )
  }

}
