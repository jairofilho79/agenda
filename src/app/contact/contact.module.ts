import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactComponent } from './contact.component';
import { ListContactComponent } from './list-contact/list-contact.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ContactComponent,
    ListContactComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ContactModule { }
