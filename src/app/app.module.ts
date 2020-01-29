import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { ContactModule } from './contact/contact.module';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContactModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
