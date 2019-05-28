import { Component, OnInit } from '@angular/core';
import { ChartsComponent } from '../charts.component';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ReportService } from 'src/app/admin/report/report.service';


@Component({
  selector: 'app-pets-by-day',
  templateUrl: '../charts.component.html',
  styleUrls: ['./pets-by-day.component.css']
})
export class PetsByDayComponent extends ChartsComponent {

  description = "Pets that were put up for adoption by users";

  public chartData: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [
      ['Date', '# of new pets']
    ],
    options: {
      title: 'New Pets',
      width: this.width,
      height: this.height,
      timeline: {
        groupByRowLabel: true
      },
      series:{
        0:{color:'purple'}
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
    this.chartData.dataTable = [ ['Date', '# of new pets']];

    var self = this;

    this.reportService.petsByDay(this.start, this.end)
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
