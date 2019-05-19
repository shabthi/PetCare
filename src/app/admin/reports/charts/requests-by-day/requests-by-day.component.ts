import { Component, OnInit } from '@angular/core';
import { ChartsComponent } from '../charts.component';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ReportService } from 'src/app/admin/report/report.service';


@Component({
  selector: 'app-requests-by-day',
  templateUrl: '../charts.component.html',
  styleUrls: ['./requests-by-day.component.css']
})
export class RequestsByDayComponent extends ChartsComponent {

  public chartData: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [
      ['Date', '# of Requests']
    ],
    options: {
      title: 'Requests',
      width: this.width,
      height: this.height,
      timeline: {
        groupByRowLabel: true
      },
      series:{
        0:{color:'red'}
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
        duration: 2000,
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
    this.chartData.dataTable = [ ['Date', '# of Requests']];

    var self = this;

    this.reportService.requestsByDay(this.start, this.end)
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
