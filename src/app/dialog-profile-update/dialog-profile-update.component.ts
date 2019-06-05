import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../shared/user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dialog-profile-update',
  templateUrl: './dialog-profile-update.component.html',
  styleUrls: ['./dialog-profile-update.component.css']
})
export class DialogProfileUpdateComponent implements OnInit {

  updatedDate;

  constructor(private userService: UserService, private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  // Update user profile
  updateProfile() {
    this.updatedDate = [
      { "propName": "address", "value": this.userService.updateForm.value.address },
      { "propName": "telephone", "value": this.userService.updateForm.value.telephone }
    ]

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', "Bearer " + this.userService.getToken());

    this.http.patch(environment.serverUrl + '/user/update', this.updatedDate, {
      headers: headers,
      observe: 'response'
    }).subscribe(
      res => {
        if (res.status == 200) {
          this.userService.user.address = this.userService.updateForm.value.address;
          this.userService.user.telephone = this.userService.updateForm.value.telephone;

          // Snackbar alert for success
          this._snackBar.open("Profile Updated!", "", {
            duration: 3000,
          });
        }
      },
      err => {
        // Snackbar alert for error
        this._snackBar.open("Update Failed!", "", {
          duration: 3000,
        });
      });
  }
}
