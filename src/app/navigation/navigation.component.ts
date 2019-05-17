import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  userType: string;
  userName: string;

  constructor() { }

  ngOnInit() {
    this.userType = localStorage.getItem('currentUserType');
    this.userName = localStorage.getItem('currentUserName');
  }

}
