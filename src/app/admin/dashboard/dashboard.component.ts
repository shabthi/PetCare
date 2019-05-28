import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  week_start:string;
  today:string;

  constructor() { }

  ngOnInit() {
    this.week_start = moment().subtract(6, 'days').format("YYYY-MM-DD");
    this.today = moment().format("YYYY-MM-DD");
  }

}
