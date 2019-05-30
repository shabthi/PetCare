import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  report = {
    type:"daily",
    date1:moment().subtract(6, 'days').toDate(),
    date2:moment().toDate()
  }

  dates = {
    today:moment().toDate(),
    yesterday:moment().subtract(1, 'days').toDate(),
    seven_days:moment().subtract(7, 'days').toDate(),
  }

  constructor(private router:Router) { }

  ngOnInit() {
    console.log("date2", this.report.date2);
    console.log("today", this.dates.today);
  }

  generate(){
    let date = moment(this.report.date1).format("YYYY-MM-DD");
    let date2 = moment(this.report.date2).format("YYYY-MM-DD");
    //console.log(date);
    if(this.report.type == "daily") this.router.navigate(['/admin/reports/' + this.report.type + '/' + date2]);
    if(this.report.type == "range") this.router.navigate(['/admin/reports/' + this.report.type + '/' + date + '/' + date2]);
  }

}
