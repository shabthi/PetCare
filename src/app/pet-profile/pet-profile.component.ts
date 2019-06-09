import { Component, OnInit } from '@angular/core';
import { PetService } from '../shared/pet.service';
import { Pet } from '../pet';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrls: ['./pet-profile.component.css']
})
export class PetProfileComponent implements OnInit {
  private pets: Pet[];

  constructor(private petService: PetService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.readPets();
  }
  newPet(event: any) {
    event.preventDefault();
    this.petService.setter(new Pet());
    this.router.navigate(['/petCreate']);

  }
  readPets() {
    this.petService.readPets().subscribe(
      data => {
        console.log(data);
        this.pets = data['msg'];
      },
      error => {
        console.log(error);
      }

    )
  }
  doUpdate(pet) {
    this.petService.setter(pet);
    this.router.navigate(['/petCreate'])
  }

  onAdopt(pet) {
    this.petService.adopt(pet._id).subscribe(
      res => {
        // Snackbar alert for success
        this._snackBar.open("Request sent !", "", {
          duration: 3000,
        });
      },
      err => {
        if (err.status == 409) {
          // Snackbar alert for conflicts
          this._snackBar.open("You have already sent a request!", "", {
            duration: 3000,
          });
        } else if (err.status == 401) {
          // Snackbar alert for unauthorized requests
          this._snackBar.open("You must be signed in to make this request!", "", {
            duration: 3000,
          });
        }
      }
    )
  }

}

