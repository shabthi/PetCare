import { Component, OnInit, Input } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';


declare var $: any;
declare var google: any;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {

  @Input() width:number = 750;
  @Input() height:number = 400;
  @Input() start: string = "2019-03-04";
  @Input() end: string = new Date().toISOString().split("T")[0];

  
  public  chartData: GoogleChartInterface;

  public loaded = false;
  public error = true;

  constructor() { }

  protected setParams(){
    var options:any = this.chartData.options;
    options.width = this.width;
    options.height = this.height;
    options.chartArea.width = this.width - 50;
    options.chartArea.left = this.width/10;
    options.lineWidth = this.width/200;
    options.pointSize = this.width/100;
  }


  ngOnInit() {
  }

  ngOnChanges() {
    if(this.loaded == false) return;
    this.loaded = false;
    this.ngOnInit();
  }

}
