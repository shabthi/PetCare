import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = {
    email:"",
    password:""
  }
  
  error: boolean = false;
  error_message:String = "";

  constructor(private adminService: AdminService, private router:Router) { }

  ngOnInit() {
  }

  submit(){
    this.error = false;
    var self = this;
    this.adminService.login(this.form.email, this.form.password)
    .then(function(result){
      self.error = false;
      location.href = "/";
    })
    .catch(function(error){
      self.error = true;
      console.log(error);
      self.error_message = error.error;
    });
  }

}
