import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { checkPasswordValidator } from './check-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isRegistering = false;
  passwordHidden = true;
  confirmPasswordHidden = true;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        password: ['', Validators.required],
        confirmPassword: ['',Validators.required]
      },
      {
        validators: [checkPasswordValidator]
      }
    )
  }

  signup() {
    this.isRegistering = true;
    const {name, email, password} = this.signupForm.getRawValue();
    this.signupService
      .signup({name, email, password})
      .subscribe(
        () => {
          this.isRegistering = false;
          this.signupForm.reset();
          this.toast.success('Usuário Cadastrado com sucesso', 'Sucesso!')
            .onHidden.subscribe(() => {
              this.router.navigate(['/', 'signin']);
           })

        },
        err => {
          this.isRegistering = false;
          if(err.errors) {
            for(let error of err.errors) {
              this.toast.error(error, "Erro!");
            }
            return
          }
          this.toast.error("Erro no servidor!", "Erro!");
          console.error(err)
        }
      )
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { confirmPassword: true }
  }

}
