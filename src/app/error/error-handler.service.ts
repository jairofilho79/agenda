import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../core/user/user.service';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class ErrorHandlerService {

  constructor(
    private toast: ToastrService,
    private userService: UserService,
    private router: Router
  ) {}

  showErrors(err) {
    if(err.errors) {
      for(let error of err.errors) {
        this.toast.error(error, "Erro!");
      }
      return
    }
    if(Object.getPrototypeOf(err).constructor.name === "ProgressEvent" || err.status === 401) {
      this.toast
        .error("Por favor, faça o Login", "Erro!")
        .onHidden
        .subscribe(() => {
          this.userService.logout()
          this.router.navigate(['/', 'signin'])
        })
      return;
    }
    this.toast.error("Erro no servidor!", "Erro!");
    console.error(err)
  }
}
