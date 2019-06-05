import { Component, OnInit, ViewChild } from '@angular/core';
import { ExportService } from 'src/app/admin/export/export.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

@Component({
  selector: 'app-export-users',
  templateUrl: './export-users.component.html',
  styleUrls: ['./export-users.component.css']
})
export class ExportUsersComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'fullName', 'nic', 'address', 'email', 'telephone'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource;
  renderedData;

  constructor(private exportService: ExportService) {
    let self = this;
    this.exportService.users().then(function (results: []) {
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
    d.unshift(['ID', 'Full Name', 'NIC', 'Address', 'Email', 'Contact No'])
    new Angular5Csv(this.renderedData, 'users');
  }

  ngOnInit() {
  }

}
