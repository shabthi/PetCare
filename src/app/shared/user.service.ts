import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  signUpForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    nic: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', Validators.required), 
  });

  initializeSignUpFormGroup() {
    this.signUpForm.setValue({
      $key: null,
      fullName: '',
      address: '',
      nic: '',
      email: '',
      telephone: '',
      password: ''
    });
  }

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required), 
  });

  // Save token in local storage
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
