import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactComponent } from './contact.component';
import { ListContactComponent } from './list-contact/list-contact.component';
import { RegisterComponent } from './register/register.component';
import { CardContactComponent } from './list-contact/card-contact/card-contact.component';
import { PhonePipe } from './list-contact/card-contact/phone.pipe';
import { NamePipe } from './list-contact/card-contact/name.pipe';
import { WelcomeComponent } from './welcome/welcome.component';
import { SearchComponent } from './list-contact/search/search.component';
import { PhoneMaskDirective } from './register/phoneMask.directive';


@NgModule({
  declarations: [
    ContactComponent,
    ListContactComponent,
    RegisterComponent,
    CardContactComponent,
    PhonePipe,
    NamePipe,
    PhoneMaskDirective,
    WelcomeComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContactModule { }
