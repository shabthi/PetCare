import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../report/report.service';
import * as moment from 'moment';

@Component({
  selector: 'app-range-report',
  templateUrl: './range-report.component.html',
  styleUrls: ['./range-report.component.css']
})
export class RangeReportComponent implements OnInit {

  @Input() start:string;
  @Input() end:string;

  @Input() dashboard = false;

  report = {

    start: "",
    end: "",
    days:0,

    stats: {
      adoptions: 0,
      requests: 0,
      pets: 0,
      users: 0,
      active: 0
    },

    changes: {
      adoptions: 0,
      requests: 0,
      pets:0,
      users: 0,
      active: 0
    }

  }

  constructor(private route: ActivatedRoute, private reportService: ReportService) {
    this.route.params.subscribe(params => {
      this.ngOnInit(); // reset and set based on new parameter this time
    });
  }


  async ngOnInit() {

    if(this.start != undefined){
      this.report.start = this.start;
      this.report.end = this.end;
    }
    else{
      this.report.start = this.route.snapshot.params['start'];
      this.report.end = this.route.snapshot.params['end'];  
    }

    this.report.days = moment(this.report.end, "YYYY-MM-DD").diff(moment(this.report.start, "YYYY-MM-DD"), 'days') + 1;
    console.log(this.report.days);
    let self = this;

    let p1 = this.reportService.adoptionsByDay(this.report.start, this.report.end)
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

    let p2 = this.reportService.requestsByDay(this.report.start, this.report.end)
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

    let p3 = this.reportService.petsByDay(this.report.start, this.report.end)
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

      let p4 = this.reportService.usersByDay(this.report.start, this.report.end)
      .then(function (results) {
        self.report.stats.users = 0;
        for (var key in results) {
          self.report.stats.users += results[key];
        }
      })
      .catch(function (error) {
        console.log(error);
        self.report.stats.users = 0;
      });

      let p5 = this.reportService.activeByDay(this.report.start, this.report.end)
      .then(function (results) {
        self.report.stats.active = 0;
        for (var key in results) {
          self.report.stats.active += results[key];
        }
      })
      .catch(function (error) {
        console.log(error);
        self.report.stats.active = 0;
      });

      await p1; await p2; await p3; await p4; await p5;
      let prev = {
        start: moment(this.report.start).subtract(this.report.days, 'days').format("YYYY-MM-DD"),
        end: moment(this.report.end).subtract(this.report.days, 'days').format("YYYY-MM-DD")
      }

      this.reportService.adoptionsByDay(prev.start, prev.end)
      .then(function (results) {
        let prev_value = 0;
        for (var key in results) {
          prev_value += results[key];
        }
        self.report.changes.adoptions = self.report.stats.adoptions - prev_value;
      })
      .catch(function (error) {
        console.log(error);
        self.report.changes.adoptions = 0;
      });

      this.reportService.petsByDay(prev.start, prev.end)
      .then(function (results) {
        let prev_value = 0;
        for (var key in results) {
          prev_value += results[key];
        }
        self.report.changes.pets = self.report.stats.pets - prev_value;
      })
      .catch(function (error) {
        console.log(error);
        self.report.changes.pets = 0;
      });

      this.reportService.requestsByDay(prev.start, prev.end)
      .then(function (results) {
        let prev_value = 0;
        for (var key in results) {
          prev_value += results[key];
        }
        self.report.changes.requests = self.report.stats.requests - prev_value;
      })
      .catch(function (error) {
        console.log(error);
        self.report.changes.requests = 0;
      });

      this.reportService.usersByDay(prev.start, prev.end)
      .then(function (results) {
        let prev_value = 0;
        for (var key in results) {
          prev_value += results[key];
        }
        self.report.changes.users = self.report.stats.users - prev_value;
      })
      .catch(function (error) {
        console.log(error);
        self.report.changes.users = 0;
      });

      this.reportService.activeByDay(prev.start, prev.end)
      .then(function (results) {
        let prev_value = 0;
        for (var key in results) {
          prev_value += results[key];
        }
        self.report.changes.active = self.report.stats.active - prev_value;
      })
      .catch(function (error) {
        console.log(error);
        self.report.changes.active = 0;
      });
  }


}
