import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  

  getUserName():String{
    return this.authService.getName();
  }

  getUserType():String{
    if(this.authService.isLogged()) return this.authService.getType();
  }

}

