import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ExportService } from '../export.service';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

@Component({
  selector: 'app-export-pets',
  templateUrl: './export-pets.component.html',
  styleUrls: ['./export-pets.component.css']
})
export class ExportPetsComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'type', 'name', 'age', 'description', 'ownerEmail', 'status', 'adopterId'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource;
  renderedData;

  constructor(private exportService: ExportService) {
    let self = this;
    this.exportService.pets().then(function (results: []) {
      self.dataSource = new MatTableDataSource(results);
      self.dataSource.sort = self.sort;
      self.dataSource.paginator = self.paginator;
      self.dataSource.connect().subscribe(d => self.renderedData = d);
    })
      .catch(function (err) {
        console.log(err);
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportCsv() {
    let d = this.renderedData;
    d.unshift(['ID', 'Type', 'Name', 'Age', 'Description', 'Owner', 'Status', 'Adopter']);
    new Angular5Csv(this.renderedData, 'pets');
  }

  ngOnInit() {
  }

}
