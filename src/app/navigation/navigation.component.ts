import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {



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
