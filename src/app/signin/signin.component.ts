import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  signIn() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    this.http.post(environment.serverUrl + '/user/login', JSON.stringify(this.userService.signInForm.value), {
      headers: headers,
      observe: 'response'
    })
      .subscribe(res => {
        if (res.status == 200) {
          this.userService.setToken(res.body['token']);
          this.router.navigate(['/home']);
        }
      }, err => {
        this._snackBar.open("Sign in failed!", "", {
          duration: 5000,
        });
      });
  };

}
