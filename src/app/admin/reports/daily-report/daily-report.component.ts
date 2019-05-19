import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../report/report.service';

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
    }

  }

  constructor(private route: ActivatedRoute, private reportService: ReportService) {
    this.route.params.subscribe(params => {
      this.ngOnInit(); // reset and set based on new parameter this time
    });
  }


  ngOnInit() {

    
    this.report.date = this.route.snapshot.params['date'];
    this.report.start = new Date(new Date(this.report.date).setDate(new Date(this.report.date).getDate() - 4)).toISOString().split("T")[0];
    this.report.prev = new Date(new Date(this.report.date).setDate(new Date(this.report.date).getDate() - 1)).toISOString().split("T")[0];
    this.report.next = new Date(new Date(this.report.date).setDate(new Date(this.report.date).getDate() + 1)).toISOString().split("T")[0];

    let self = this;

    this.reportService.adoptionsByDay(this.report.date, this.report.date)
      .then(function (results) {
        if (results[self.report.date] == undefined) results[self.report.date] = 0;
        self.report.stats.adoptions = results[self.report.date];
      })
      .catch(function (error) {
        console.log(error);
        self.report.stats.adoptions = 0;
      });

    this.reportService.requestsByDay(this.report.date, this.report.date)
      .then(function (results) {
        if (results[self.report.date] == undefined) results[self.report.date] = 0;
        self.report.stats.requests = results[self.report.date];
      })
      .catch(function (error) {
        console.log(error);
        self.report.stats.requests = 0;
      });

      this.reportService.petsByDay(this.report.date, this.report.date)
      .then(function (results) {
        if (results[self.report.date] == undefined) results[self.report.date] = 0;
        self.report.stats.pets = results[self.report.date];
      })
      .catch(function (error) {
        console.log(error);
        self.report.stats.pets = 0;
      });

  }


}
