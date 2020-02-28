import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/error/error-handler.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm:FormGroup;
  isLogging = false;
  passwordHidden = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: ['', Validators.required]
    })
  }

  login() {
    this.isLogging = true
    const {email, password} = this.signinForm.getRawValue();
    this
      .authService
      .authenticate(email, password)
      .subscribe(
        (res:any) => {
          this.isLogging = false;
          this.userService.setToken(res.data.token);
          this.router.navigate(['/','contacts'])
        },
        err => {
          this.isLogging = false;
          if(err.status === 401) {
            this.toast.error("Dados incorretos ou usuário não cadastrado!", "Erro!");
            return;
          }
          this.errorHandler.showErrors(err);
        }
      )
  }
}
