import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;

  constructor(
    private authService:AuthService, 
    public dialog: MatDialog, 
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }
  

  getUserName():String{
    return this.authService.getName();
  }

  getUserType():String{
    if(this.authService.isLogged()) return this.authService.getType();
  }

  // Check the user logged in or not
  isLoggedIn() {
    if(this.userService.isLoggedIn()) {
      return true;
    }else {
      return false;
    }
  }

  // Log out user
  logout() {
    this.userService.deleteToken();
    this.router.navigate(['/signin']);
  }
}