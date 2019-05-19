import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private authService:AuthService) { }

  //register admin
  create(email: String, name: String, password: String) {
    let self = this;
    return new Promise(function(resolve, reject){
      let url = "http://localhost:8080/admin/register"
      self.http.post(url, 
        {
         name:name,
         email:email,
         password:password 
        }).toPromise()
      .then(function (result) {
        console.log(result);
        resolve(result);
      })
      .catch(function (error) {
        reject(error);
      })
    })
  }

  //validate admin login
  login(email:String, password:String){
    let self = this;
    return new Promise(function(resolve, reject){
      let url = "http://localhost:8080/admin/login"
      self.http.post(url, 
        {
         email:email,
         password:password 
        }).toPromise()
      .then(function (result:string) {
        self.authService.setUser(result, 'admin');
        resolve();
      })
      .catch(function (error) {
        reject(error);
      })
    })
  }

}
