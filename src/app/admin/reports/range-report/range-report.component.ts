import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../report/report.service';
import * as moment from 'moment';

@Component({
  selector: 'app-range-report',
  templateUrl: './range-report.component.html',
  styleUrls: ['./range-report.component.css']
})
export class RangeReportComponent implements OnInit {

  report = {

    start: "",
    end: "",
    days:0,

    stats: {
      adoptions: 0,
      requests: 0,
      pets: 0
    }

  }

  constructor(private route: ActivatedRoute, private reportService: ReportService) {
    this.route.params.subscribe(params => {
      this.ngOnInit(); // reset and set based on new parameter this time
    });
  }


  ngOnInit() {


    this.report.start = this.route.snapshot.params['start'];
    this.report.end = this.route.snapshot.params['end'];
    this.report.days = moment(this.report.end, "YYYY-MM-DD").diff(moment(this.report.start, "YYYY-MM-DD"), 'days') + 1;
    console.log(this.report.days);
    let self = this;

    this.reportService.adoptionsByDay(this.report.start, this.report.end)
      .then(function (results) {
        self.report.stats.adoptions = 0;
        for (var key in results) {
          self.report.stats.adoptions += results[key];
        }
      })
      .catch(function (error) {
        console.log(error);
        self.report.stats.adoptions = 0;
      });

    this.reportService.requestsByDay(this.report.start, this.report.end)
      .then(function (results) {
        self.report.stats.requests = 0;
        for (var key in results) {
          self.report.stats.requests += results[key];
        }
      })
      .catch(function (error) {
        console.log(error);
        self.report.stats.requests = 0;
      });

    this.reportService.petsByDay(this.report.start, this.report.end)
      .then(function (results) {
        self.report.stats.pets = 0;
        for (var key in results) {
          self.report.stats.pets += results[key];
        }
      })
      .catch(function (error) {
        console.log(error);
        self.report.stats.pets = 0;
      });

  }


}
