import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = {
    email:"",
    name:"",
    password:"",
    c_password:""
  }

  errors = {
    password_mismatch:false,
    email_empty:false,
    name_empty:false,
    password_empty:false,
    email_invalid:false
  }

  touched = {
    email:false,
    name:false,
    password:false,
    c_password:false
  }

  constructor(
    private admin:AdminService
  ) { }

  ngOnInit() {
  }

  isTouched():boolean{
    for(var o in this.touched){
      if(this.touched[o]) return true;
    }
    return false;
  }

  validate():boolean{
    var valid = true;

    //reset errors
    for(var key in this.errors){
      this.errors[key] = false;
    }

    if(this.form.password != this.form.c_password){
      this.errors.password_mismatch = true;
      valid = false;
    }

    if(this.form.email == ""){
      this.errors.email_empty = true;
      valid = false;
    }

    if(this.form.name == ""){
      this.errors.name_empty = true;
      valid = false;
    }

    if(this.form.password == ""){
      this.errors.password_empty = true;
      valid = false;
    }

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(this.form.email).toLowerCase()) == false){
      this.errors.email_invalid = true;
      valid = false;
    }

    return valid;
  }

  submit(): void{
    if(!this.validate()) return;
    var res = this.admin.create(this.form.email, this.form.name, this.form.password);

    if(!res){
      alert("Error");
    }

  }

}
