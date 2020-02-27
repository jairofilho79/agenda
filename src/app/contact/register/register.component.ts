import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { RegisterService } from './register.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Snippets } from 'src/shared/Snippets';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UserService } from 'src/app/core/user/user.service';
import { Router } from '@angular/router';
import { ListContactService } from '../list-contact/list-contact.service';


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
    private userService: UserService,
    private listContactService: ListContactService,
    private toast: ToastrService,
    private router: Router,
    private formBuilder:FormBuilder,
    private ngxSmartModalService: NgxSmartModalService
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['']
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
              this.listContactService.goGetContacts()
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
              this.ngxSmartModalService.close('addContact')
            } catch(e) {}
          })
      },
      err => {
        this.isRegistering = false;
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
  }

}
