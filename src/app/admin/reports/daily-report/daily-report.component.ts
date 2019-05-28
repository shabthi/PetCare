import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../report/report.service';
import * as moment from 'moment';
@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})
export class DailyReportComponent implements OnInit {

  report = {

    date: "",
    start: "",
    prev: "",
    next: "",


    stats: {
      adoptions: 0,
      requests: 0,
      pets:0
    },

    changes: {
      adoptions: 0,
      requests: 0,
      pets:0
    }

  }

  constructor(private route: ActivatedRoute, private reportService: ReportService) {
    this.route.params.subscribe(params => {
      this.ngOnInit(); // reset and set based on new parameter this time
    });
  }


  async ngOnInit() {

    
    this.report.date = this.route.snapshot.params['date'];
    this.report.start = new Date(new Date(this.report.date).setDate(new Date(this.report.date).getDate() - 4)).toISOString().split("T")[0];
    this.report.prev = new Date(new Date(this.report.date).setDate(new Date(this.report.date).getDate() - 1)).toISOString().split("T")[0];
    this.report.next = new Date(new Date(this.report.date).setDate(new Date(this.report.date).getDate() + 1)).toISOString().split("T")[0];

    let self = this;

    let p1 = this.reportService.adoptionsByDay(this.report.date, this.report.date)
      .then(function (results) {
        if (results[self.report.date] == undefined) results[self.report.date] = 0;
        self.report.stats.adoptions = results[self.report.date];
      })
      .catch(function (error) {
        console.log(error);
        self.report.stats.adoptions = 0;
      });

    let p2 = this.reportService.requestsByDay(this.report.date, this.report.date)
      .then(function (results) {
        if (results[self.report.date] == undefined) results[self.report.date] = 0;
        self.report.stats.requests = results[self.report.date];
      })
      .catch(function (error) {
        console.log(error);
        self.report.stats.requests = 0;
      });

      let p3 = this.reportService.petsByDay(this.report.date, this.report.date)
      .then(function (results) {
        if (results[self.report.date] == undefined) results[self.report.date] = 0;
        self.report.stats.pets = results[self.report.date];
      })
      .catch(function (error) {
        console.log(error);
        self.report.stats.pets = 0;
      });

      await p1; await p2; await p3;
      let prev_date = moment(this.report.date).subtract(1, 'days').format("YYYY-MM-DD");
      
      this.reportService.adoptionsByDay(prev_date, prev_date)
      .then(function (results) {
        let prev_value = results[prev_date] || 0;
        self.report.changes.adoptions = self.report.stats.adoptions - prev_value;
      })
      .catch(function (error) {
        console.log(error);
        self.report.changes.adoptions = 0;
      });

      this.reportService.requestsByDay(prev_date, prev_date)
      .then(function (results) {
        let prev_value = results[prev_date] || 0;
        self.report.changes.requests = self.report.stats.requests - prev_value;
      })
      .catch(function (error) {
        console.log(error);
        self.report.changes.requests = 0;
      });

      this.reportService.petsByDay(prev_date, prev_date)
      .then(function (results) {
        let prev_value = results[prev_date] || 0;
        self.report.changes.pets = self.report.stats.pets - prev_value;
      })
      .catch(function (error) {
        console.log(error);
        self.report.changes.pets = 0;
      });

  }


}
