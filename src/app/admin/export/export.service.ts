import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http: HttpClient) { }

  users(){
    let self = this;
    return new Promise(function (resolve, reject) {
      let url = "http://localhost:8080/export/users"
      self.http.get(url).toPromise()
        .then(function (results) {
          resolve(results);
        })
        .catch(function (error) {
          reject(error);
        });
    });

  }

  pets(){
    let self = this;
    return new Promise(function (resolve, reject) {
      let url = "http://localhost:8080/export/pets"
      self.http.get(url).toPromise()
        .then(function (results) {
          resolve(results);
        })
        .catch(function (error) {
          reject(error);
        });
    });

  }
}
