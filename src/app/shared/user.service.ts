import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    nic: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', Validators.required), 
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      address: '',
      nic: '',
      email: '',
      telephone: '',
      password: ''
    });
  }
}
