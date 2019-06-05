import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Pet} from '../pet';
@Injectable({
  providedIn: 'root'
})
export class PetService {
  private pet:Pet
  private baseUri:string="http://localhost:8080";
  private headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { }

  createPet(pet:any){
    console.log("in service", pet);
    let formData:FormData = new FormData();
    formData.append('image', pet.image2, pet.image2.name);
    formData.append('type', pet.type);
    formData.append('name', pet.name);
    formData.append('age', pet.age);
    formData.append('description', pet.description);
    formData.append('adopterId', pet.adopterId);
    formData.append('ownerEmail', pet.ownerEmail);
    let  headers = new HttpHeaders().set('Content-Type','multipart/form-data');
    return this.http.post(this.baseUri+'/create',formData,{});
  }
  readPets(){
    return this.http.get(this.baseUri+'/read',{headers:this.headers});
  }
  updatePet(pet:Pet){
    return this.http.put(this.baseUri+'/update',pet,{headers:this.headers});
  }
  deletePet(id:String){
    return this.http.delete(this.baseUri+'/delete/'+id,{headers:this.headers});
  }
  setter(pet:Pet){
    this.pet=pet;
  }
  getter(){
    return this.pet;
  }
}
