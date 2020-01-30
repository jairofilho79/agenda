import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ContactComponent } from './contact.component';
import { ListContactComponent } from './list-contact/list-contact.component';
import { RegisterComponent } from './register/register.component';
import { CardContactComponent } from './list-contact/card-contact/card-contact.component';


@NgModule({
  declarations: [
    ContactComponent,
    ListContactComponent,
    RegisterComponent,
    CardContactComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class ContactModule { }
