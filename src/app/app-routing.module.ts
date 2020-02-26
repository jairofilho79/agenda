import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from './contact/contact.component';
import { ListContactComponent } from './contact/list-contact/list-contact.component';
import { RegisterComponent } from './contact/register/register.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { ListContactResolver } from './contact/list-contact/list-contact.resolver';
import { WelcomeComponent } from './contact/welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './home/signin/signin.component';
import { SignupComponent } from './home/signup/signup.component';
import { UserGuard } from './core/user/user.guard';
import { AuthGuard } from './core/auth/auth.guard';
import { UserChildGuard } from './core/user/user-child.guard';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'signin',
        component: SigninComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'contacts',
    component: ContactComponent,
    canActivate: [UserGuard],
    canActivateChild: [UserChildGuard],
    children: [
      {
        path: '',
        component: ListContactComponent,
        resolve: {
          contacts: ListContactResolver
        }
      },
      {path: 'register', component: RegisterComponent}
    ]
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
