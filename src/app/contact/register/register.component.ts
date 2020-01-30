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
    this.contact.phone = parseInt(this.phoneInput.value) || null;

    if(this.contact.phone !== null) {
      if(
        this.contact.phone.toString().length !== 10 &&
        this.contact.phone.toString().length !== 11
       ) {
         alert("Telefone Inválido!")
         this.phoneInput.value = ""
         this.phoneInput.focus();
         return;
       }

    }

    console.log(this.contact)

    this.registerService.registerContact(this.contact).subscribe(response => {
      console.log(response);
    })
  }

}
