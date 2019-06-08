import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = {"fullName": "", "address": "", "email": "", "nic": "", "telephone": "", "profilePicture": ""};

  constructor(private http: HttpClient) { }

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

  updateForm: FormGroup = new FormGroup({
    address: new FormControl('', [Validators.required]),
    telephone: new FormControl('', Validators.required),
  });

  // Save token in local storage
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Save token in local storage
  getToken() {
    return localStorage.getItem('token');
  }

  // Delete token
  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
