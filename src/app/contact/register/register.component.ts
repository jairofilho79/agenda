import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { RegisterService } from './register.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Snippets } from 'src/shared/Snippets';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ListContactService } from '../list-contact/list-contact.service';
import { ErrorHandlerService } from 'src/app/error/error-handler.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private contact:Contact = new Contact();
  registerForm: FormGroup;

  isRegistering:boolean = false;

  constructor(
    private registerService:RegisterService,
    private errorHandler: ErrorHandlerService,
    private listContactService: ListContactService,
    private toast: ToastrService,
    private formBuilder:FormBuilder,
    private ngxSmartModalService: NgxSmartModalService
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email]
    })
  }

  register() {
    this.isRegistering = true
    const formValue = this.registerForm.getRawValue();
    this.contact.name = formValue.name;
    this.contact.email = formValue.email;
    this.contact.phone = <number>Snippets.onlyTelefoneNumbers(formValue.phone);

    this.registerService.registerContact(this.contact).subscribe(
      () => {
        this.registerForm.reset();
        this.isRegistering = false;
        this.toast
          .success('Contato salvo!', "Sucesso!")
          .onHidden
          .subscribe(() => {
            try {
              this.listContactService.goGet("USER")
                .catch(err => this.errorHandler.showErrors(err));

              this.ngxSmartModalService.close('addContact')
            } catch(e) {}
          })
      },
      err => {
        this.isRegistering = false;
        this.errorHandler.showErrors(err);
      }
    )
  }

}
