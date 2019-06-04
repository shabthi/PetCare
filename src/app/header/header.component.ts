import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;

  constructor(private authService:AuthService, public dialog: MatDialog, private service: UserService) { }

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
    if(this.service.isLoggedIn()) {
      return true;
    }else {
      return false;
    }
  }
}