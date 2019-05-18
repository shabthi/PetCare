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

    stats: {
      adoptions: 0
    }

  }

  constructor(private route: ActivatedRoute, private reportService: ReportService) {
    this.report.date = this.route.snapshot.params['date'];
    this.report.start = new Date(new Date(this.report.date).setDate(new Date(this.report.date).getDate() - 6)).toISOString().split("T")[0];
  }

  ngOnInit() {

    let self = this;

    this.reportService.adoptionsByDay(this.report.date, this.report.date)
      .then(function (results) {
        if(results[self.report.date] == undefined) results[self.report.date] = 0;
        self.report.stats.adoptions = results[self.report.date];
      })
      .catch(function (error) {
        console.log(error);
        self.report.stats.adoptions = 0;
      });

  }

}
