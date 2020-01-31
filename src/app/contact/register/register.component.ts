import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { RegisterService } from './register.service';

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

  constructor(private registerService:RegisterService) { }

  ngOnInit() {
    this.nameInput = (<HTMLInputElement>document.querySelector("#name"))
    this.emailInput = (<HTMLInputElement>document.querySelector("#email"))
    this.phoneInput = (<HTMLInputElement>document.querySelector("#phone"))
  }

  register() {

    this.contact.name = this.nameInput.value;
    this.contact.email = this.emailInput.value;
    const phone = this.registerService.validatePhone(this.phoneInput.value);

    if(phone === false) {
      this.phoneInput.value;
      this.phoneInput.focus();
      alert('Telefone inválido');
      return;
    }

    this.contact.phone = <number>phone;

    this.registerService.registerContact(this.contact).subscribe(() => {
      this.nameInput.value = ""
      this.emailInput.value = ""
      this.phoneInput.value = ""
      alert('Contato salvo com sucesso!')
    })
  }

}
