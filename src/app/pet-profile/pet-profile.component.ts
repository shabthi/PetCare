import { Component, OnInit } from '@angular/core';
import { PetService } from '../shared/pet.service';
import { Pet } from '../pet';
import {Router} from '@angular/router'; 
  
@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrls: ['./pet-profile.component.css']
})
export class PetProfileComponent implements OnInit {
  private pets:Pet[];
  constructor(private petService:PetService,private router:Router) { }

  ngOnInit() {
    this.readPets(); 
  }
  newPet(event:any){
    event.preventDefault();
    this.petService.setter(new Pet());
    this.router.navigate(['/petCreate']);
    
  }
  readPets(){
    this.petService.readPets().subscribe(
      data=>{
        console.log(data);
        this.pets=data['msg'];
      },
      error=> {
        console.log(error);
      }

    )
  }
  doUpdate(pet){
    this.petService.setter(pet);
    this.router.navigate(['/petCreate'])
  }

}

