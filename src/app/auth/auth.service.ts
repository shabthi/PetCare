import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = {
    type:"",
    name:"",
    email:"",
    timestamp:""
  }

  constructor() { }

  setUser(name, type){
    this.user.type = type;
    this.user.name = name;
    this.user.timestamp = new Date().toISOString().replace("T", " ").split(".")[0];
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  removeUser(){
    localStorage.removeItem('user');
  }

  getName(){
    return "A";
    //return JSON.parse(localStorage.getItem('user')).name;
  }
  
  getType(){
    return "C";
    //return JSON.parse(localStorage.getItem('user')).type;
  }

}
