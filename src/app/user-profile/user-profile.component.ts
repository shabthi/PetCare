import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DialogProfileUpdateComponent } from '../dialog-profile-update/dialog-profile-update.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  imagePath = "";
  selectedFile: File = null;
  formData = new FormData();

  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

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
        this.imagePath = environment.serverUrl + "/"+ this.userService.user.profilePicture;
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
    const dialogRef = this.dialog.open(DialogProfileUpdateComponent, { width: '450px' });
  }

  // Upload new profile picture
  onSelectFile(event) {
    const headers = new HttpHeaders().set('Authorization', "Bearer " + this.userService.getToken());
    this.selectedFile = <File>event.target.files[0];
    this.formData.append('profilePicture', this.selectedFile, this.selectedFile.name);

    this.http.patch(environment.serverUrl + '/user/update-profile-picture', this.formData, { headers: headers })
      .subscribe(
        result => {
          this.imagePath = environment.serverUrl + "/uploads/profile-pictures/" + this.selectedFile.name;
          // Snackbar alert for success
          this._snackBar.open("Profile Picture Updated!", "", {
            duration: 3000,
          });
        },
        err => {
          console.log(err);
          // Snackbar alert for error
          this._snackBar.open("Operation Failed!", "", {
            duration: 3000,
          });
        });
  }
}
