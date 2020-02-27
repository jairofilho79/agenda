import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const checkPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password').value;
  const confirmPassword = control.get('confirmPassword').value;

  return password !== confirmPassword ? { 'checkPassword': true } : null;
};
