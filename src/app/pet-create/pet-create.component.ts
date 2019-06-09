import { Component, OnInit } from '@angular/core';
import { PetService } from '../shared/pet.service';
import { Pet } from '../pet';
import {Router} from '@angular/router'; 
import { Form, NgForm } from '@angular/forms';



const URL = 'http://localhost:3000/create';
//const URL = 'http://localhost:3000/create';


@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css']
})
export class PetCreateComponent implements OnInit {
  private pet:Pet;
  file:any;
  
  
  constructor(private petService:PetService,private router:Router) { }

  ngOnInit() {
    this.pet=this.petService.getter();
    
  }

  onSubmit(f:NgForm){
  
    this.petService.createPet({...f.value, image2:this.file}).subscribe(
      data=>{
          console.log(data);
          this.router.navigate(['/petProfile'])
      },
      error=>{
        console.log(error);
      }
    )
  }

  onChange(e){
    this.file = e.srcElement.files[0];
    console.log(this.file);
  }

  createOrUpdate(){
    console.log(this.pet);
    if(this.pet == undefined || this.pet._id==undefined){
      this.petService.createPet(this.pet).subscribe(
        data=>{
            console.log(data);
            this.router.navigate(['/petProfile'])
        },
        error=>{
          console.log(error);
        }
      )
    }else {
      this.petService.updatePet(this.pet).subscribe(
        data=>{
            console.log(data);
            this.router.navigate(['/petProfile'])
        },
        error=>{
          console.log(error);
        }
      )
    }
    
    
  }

}
