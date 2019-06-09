import { Component, OnInit, OnDestroy } from '@angular/core';
import { PetPost } from '../pet-post';
import { PetPostService } from '../pet-post.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-pet-posts',
  templateUrl: './pet-posts.component.html',
  styleUrls: ['./pet-posts.component.css']
})
export class PetPostsComponent implements OnInit, OnDestroy {

  petposts:PetPost[]=[];
  subscription:Subscription; 
  // id:string;

  constructor(private petPostService:PetPostService,
  private router:Router,
  private route:ActivatedRoute) { }

  ngOnInit() {

    this.petPostService.getPetPosts();
    this.subscription=this.petPostService.petPostsChanged
    .subscribe((petposts:PetPost[])=>{
      this.petposts=petposts;
    });
  }

  onNewPost(){
    this.subscription=this.petPostService.petPostsChanged
    .subscribe(
      (petposts:PetPost[])=>{
      
       this.petposts=petposts;
      }
    );
    this.router.navigate(['addPetPost']);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onDeletePetPost(id){
    if(confirm("Delete the post!")){
      console.log(id);
      this.petPostService.deletePetPost(id);
      this.router.navigate(['/petPosts']);
    }
  }
}
