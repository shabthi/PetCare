import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  adoptionsByDay(start: string, end: string) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let url = "http://localhost:8080/stats/adoptions-by-day"
      self.http.post(url,
        {
          start: start,
          end: end
        }).toPromise()
        .then(function (results) {
          resolve(results);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  requestsByDay(start: string, end: string) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let url = "http://localhost:8080/stats/requests-by-day"
      self.http.post(url,
        {
          start: start,
          end: end
        }).toPromise()
        .then(function (results) {
          resolve(results);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  petsByDay(start: string, end: string) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let url = "http://localhost:8080/stats/pets-by-day"
      self.http.post(url,
        {
          start: start,
          end: end
        }).toPromise()
        .then(function (results) {
          resolve(results);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
}
