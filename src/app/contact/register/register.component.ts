import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { RegisterService } from './register.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Snippets } from 'src/shared/onlyNumber';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private contact:Contact = new Contact();
  private registerForm: FormGroup;

  isRegistering:boolean = false;

  constructor(
    private registerService:RegisterService,
    private toast: ToastrService,
    private formBuilder:FormBuilder
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
        this.toast.success('Contato salvo!', "Sucesso!")
      },
      err => {
        this.isRegistering = false;
        for(let error of err.errors) {
          this.toast.error(error, "Erro!");
        }
      }
    )
  }

}
