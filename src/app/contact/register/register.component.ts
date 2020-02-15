import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { RegisterService } from './register.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private contact:Contact = new Contact();

  private nameInput;
  private emailInput;
  private phoneInput;

  private isRegistering:boolean = false;

  constructor(
    private registerService:RegisterService,
    private toast: ToastrService
    ) { }

  ngOnInit() {
    this.nameInput = (<HTMLInputElement>document.querySelector("#name"))
    this.emailInput = (<HTMLInputElement>document.querySelector("#email"))
    this.phoneInput = (<HTMLInputElement>document.querySelector("#phone"))
  }

  register() {
    this.isRegistering = true
    this.contact.name = this.nameInput.value;
    this.contact.email = this.emailInput.value;
    const phone = this.registerService.validatePhone(this.phoneInput.value);

    if(phone === false) {
      this.phoneInput.value;
      this.phoneInput.focus();
      this.isRegistering = false;
      this.toast.warning("Telefone Inválido", "Atenção!")
      return;
    }

    this.contact.phone = <number>phone;

    this.registerService.registerContact(this.contact).subscribe(
      () => {
        this.nameInput.value = ""
        this.emailInput.value = ""
        this.phoneInput.value = ""
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
