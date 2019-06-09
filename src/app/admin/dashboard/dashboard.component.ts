import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ReportService } from '../report/report.service';
// import { totalmem } from 'os';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  week_start: string;
  today: string;

  total = {
    adoptions: 0,
    waiting: 0
  }

  constructor(private reportService: ReportService) { }

  async ngOnInit() {
    this.week_start = moment().subtract(6, 'days').format("YYYY-MM-DD");
    this.today = moment().format("YYYY-MM-DD");

    let self = this;

    let p1 = this.reportService.adoptionsByDay('2019-01-01', '2019-12-31')
      .then(function (results:any) {
        for (var key in results) {
          self.total.adoptions += results[key];
        }
      })
      .catch(function (error) {
        console.log(error);
        self.total.adoptions = 0;
      });

    await p1;
    this.reportService.petsByDay('2019-01-01', '2019-12-31')
      .then(function (results:any) {
        let total = 0;
        for (var key in results) {
          total += results[key];
        }
        self.total.waiting = total - self.total.adoptions;
      })
      .catch(function (error) {
        console.log(error);
        self.total.adoptions = 0;
      });
  }

}
