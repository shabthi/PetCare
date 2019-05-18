import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    let date = this.report.date1.toISOString().split("T")[0];
    this.router.navigate(['/admin/reports/' + this.report.type + '/' + date]);
  }

}
