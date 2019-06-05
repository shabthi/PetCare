import { Component, OnInit } from '@angular/core';
import { ChartsComponent } from '../charts.component';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ReportService } from 'src/app/admin/report/report.service';


@Component({
  selector: 'app-users-by-day',
  templateUrl: '../charts.component.html',
  styleUrls: ['./user-by-day.component.css']
})
export class UsersByDayComponent extends ChartsComponent {

  description = "# of newly created users in the system";

  public chartData: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [
      ['Date', 'New Users']
    ],
    options: {
      title: 'New Users',
      width: this.width,
      height: this.height,
      timeline: {
        groupByRowLabel: true
      },
      series:{
        0:{color:'#26a65b'}
      },
      chartArea: {
        width: this.width - 50,
        left: this.width / 10
      },
      legend: 'none',
      hAxis: {
        format: "YYYY-MM-dd",
        groupByRowLabel: true,
        gridlines: {
          count: -1
        }
      },
      lineWidth: this.width / 200,
      pointSize: this.width / 100,
      animation: {
        duration: 750,
        easing: "out",
        startup: true
      }
    },
  };



  constructor(private reportService:ReportService) {
    super();
  }

  ngOnInit() {
    super.setParams();
    this.chartData.dataTable = [ ['Date', '# of New Users']];

    var self = this;

    this.reportService.usersByDay(this.start, this.end)
    .then(function(results){
      let s = new Date(self.start);
      let e = new Date(self.end);
      while(s <= e){
        let s_str = s.toISOString().split("T")[0];
        let a;
        try{
          if(results[s_str] == undefined) results[s_str] = 0;
          a = [s_str, results[s_str]];
        }
        catch(err){
          a = [s_str, 0];
        }
        finally{
          self.chartData.dataTable.push(a);
        }
        s.setDate(s.getDate() + 1);
      }
      self.loaded = true;
      console.log(self.chartData.dataTable);
    })
    .catch(function(error){
      console.log(error);
      self.error = true;
    })

  }

}
