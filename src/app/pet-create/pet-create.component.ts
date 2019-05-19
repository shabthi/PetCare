import { Component, OnInit } from '@angular/core';
import { PetService } from '../shared/pet.service';
import { Pet } from '../pet';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css']
})
export class PetCreateComponent implements OnInit {
  private pet:Pet;
  constructor(private petService:PetService,private router:Router) { }

  ngOnInit() {
    this.pet=this.petService.getter();
  }
  createOrUpdate(){
    if(this.pet._id==undefined){
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
