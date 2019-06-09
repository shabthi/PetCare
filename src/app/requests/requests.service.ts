import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) {


  }

  getRequests(email) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let url = "http://localhost:3000/requests";
      self.http.post(url, {email:email}).toPromise()
      .then(function(requests){
        resolve(requests);
      })
      .catch(function(error){
        console.log("ERROR", error);
      })
    });
  }

  approve(animal_id, requestEmail){
    let self = this;
    return new Promise(function (resolve, reject) {
      let data = {
        animalId:animal_id,
        requestEmail:requestEmail
      }
      let url = "http://localhost:3000/requests/approve";
      self.http.post(url, data).toPromise()
      .then(function(results){
      })
      .catch(function(error){
        console.log("ERROR", error);
      })
    });
  }

  reject(animal_id, requestEmail){
    let self = this;
    return new Promise(function (resolve, reject) {
      let data = {
        animalId:animal_id,
        requestEmail:requestEmail
      }
      let url = "http://localhost:3000/requests/reject";
      self.http.post(url, data).toPromise()
      .then(function(results){
      })
      .catch(function(error){
        console.log("ERROR", error);
      })
    });
  }
}
