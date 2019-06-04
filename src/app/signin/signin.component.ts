import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private service: UserService, 
    private http: HttpClient, 
    private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    console.log(this.service.signInForm.value);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    this.http.post(environment.serverUrl + '/user/login', JSON.stringify(this.service.signInForm.value), {
      headers: headers,
      observe: 'response'
    })
      .subscribe(res => {
        console.log(res);
        if(res.status == 200) {
          this.service.setToken(res.body['token']);
          this.router.navigate(['/home']);
        }
      }, err => {

      });
  }

}
