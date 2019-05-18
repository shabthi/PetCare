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
    date1:new Date(),
    date2:new Date()
  }

  constructor(private router:Router) { }

  ngOnInit() {
  }

  generate(){
    let date = moment(this.report.date1).format("YYYY-MM-DD");
    //console.log(date);
    this.router.navigate(['/admin/reports/' + this.report.type + '/' + date]);
  }

}
