import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user = {"fullName": "", "address": "", "email": "", "nic": "", "telephone": ""};

  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    this.getUserProfile();
  } 

  // Get user profile data
  getUserProfile() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', "Bearer " + this.userService.getToken());

    this.http.get(environment.serverUrl + '/user/profile', {
      headers: headers
    }).subscribe(
      res => {
        this.user = res['user'];
      },
      err => {
        console.log(err);
      });
  }
}
