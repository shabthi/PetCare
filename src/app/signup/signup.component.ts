import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private userService: UserService, 
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
  }

  // Send signup request
  signUp() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    this.http.post(environment.serverUrl + '/user/signup', JSON.stringify(this.userService.signUpForm.value), {
      headers: headers,
      observe: 'response'
    })
      .subscribe(res => {
        if(res.status == 201) {
          this.router.navigate(['/signin']);
          this.userService.signUpForm.reset();
          this.userService.initializeSignUpFormGroup();
        }
      });
  }

}
