import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from './contact/contact.component';
import { ListContactComponent } from './contact/list-contact/list-contact.component';
import { RegisterComponent } from './contact/register/register.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { ListContactResolver } from './contact/list-contact/list-contact.resolver';


const routes: Routes = [
  {
    path: 'contacts',
    component: ContactComponent,
    children: [
      {
        path: 'list-contact',
        component: ListContactComponent,
        resolve: {
          contacts: ListContactResolver
        }},
      {path: 'register', component: RegisterComponent}
    ]
  },
  {path:'', redirectTo: 'contacts', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
