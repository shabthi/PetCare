import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from '../requests.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'type', 'email', 'approve', 'reject'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  constructor(private requestsService: RequestsService, private userService: UserService, private http: HttpClient,

  ) {
  }

  async ngOnInit() {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', "Bearer " + this.userService.getToken());

    let p1 = this.http.get(environment.serverUrl + '/user/profile', {
      headers: headers
    }).toPromise()
    .then(
      res => {
        this.userService.user = res['user'];
        console.log("USER2", this.userService.user);
      },
      err => {
        console.log(err);
      });

    await p1;
    let self = this;
    let requestsArr = [];
    console.log("USER", this.userService.user);
    this.requestsService.getRequests(this.userService.user.email)
      .then(function (requests: any) {
        requests.forEach(function (request) {
          console.log(request);
          let r = {
            email: request.requestEmail,
            name: request.animal.name,
            type: request.animal.type,
            image: request.animal.image,
            id: request.animal._id
          }
          requestsArr.push(r);
        })

        console.log("REQUESTS2", requestsArr);
        self.dataSource = new MatTableDataSource(requestsArr);
        self.dataSource.sort = self.sort;
        self.dataSource.paginator = self.paginator;


      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  approve(request) {
    console.log("APPROVE", request);
    this.requestsService.approve(request.id, request.email);
    location.reload();
  }

  reject(request) {
    console.log("REJECT", request);
    this.requestsService.reject(request.id, request.email);
    location.reload();
  }


}
