import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DialogProfileUpdateComponent } from '../dialog-profile-update/dialog-profile-update.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private router: Router, 
    private userService: UserService, 
    private http: HttpClient,
    public dialog: MatDialog) { }

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
        this.userService.user = res['user'];
        // Update dialog data 
        this.userService.updateForm.patchValue({
          address: this.userService.user.address,
          telephone: this.userService.user.telephone
        });
      },
      err => {
        console.log(err);
      });
  }

  openUpdateDialog() {
    const dialogRef = this.dialog.open(DialogProfileUpdateComponent, { width: '450px'});
  }
}
