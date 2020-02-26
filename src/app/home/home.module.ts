import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HeaderModule } from '../core/header/header.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    HeaderModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
