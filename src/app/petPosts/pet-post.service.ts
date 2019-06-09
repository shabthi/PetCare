import {PetPost} from './pet-post';
import { EventEmitter, Injectable } from '../../../node_modules/@angular/core';
import { Subject } from '../../../node_modules/rxjs';
import {map} from 'rxjs/operators';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({providedIn:'root'})

export class PetPostService{  
  petPostSelected=new EventEmitter<PetPost>();
  petPostsChanged=new Subject<PetPost[]>();
  private petposts:PetPost[]=[];
  private petpost:PetPost;
  
  constructor( private http:HttpClient){}
    
  getPetPosts(){
    this.http.get<{message:string,petposts:any}>('http://localhost:3000/api/petposts')
    .pipe(
      map((postData)=>{
        return postData.petposts.map(petpost=>{
          return {
            id:petpost._id,
            name:petpost.name,
            imagePath:petpost.imagePath,
            description:petpost.description
          };
        });
      })
    )
    .subscribe((transformedPetPosts)=>{
      this.petposts=transformedPetPosts;
      this.petPostsChanged.next([...this.petposts]);
    });
     
  }
  getPetPost1(id:string){
    return this.http.get<{_id:string,name:string,imagePath:string,description:string}>("http://localhost:3000/api/petposts/"+id);
        
  }

  getPetPost(id:string){
    this.petPostsChanged.subscribe((petposts:PetPost[])=>{
      this.petposts=petposts;
    });
    return {...this.petposts.find(c=>c.id===id)};
  }
     
     
  addPetPost(petpost:PetPost,image:File){
    const postData=new FormData();
     
      postData.append("id",petpost.id);
      postData.append("name",petpost.name);
      postData.append("imagePath",image);
      postData.append("description",petpost.description)
  
    this.http.post<{message:string,petpostId:string,imagePath:string}>(
      "http://localhost:3000/api/petposts/",postData
    )
    .subscribe(responseData=>{
      const id=responseData.petpostId ;
      const imagePath=responseData.imagePath;
      console.log(imagePath);
      petpost.id=id;
      petpost.imagePath=imagePath;
      this.petposts.push(petpost);
      console.log(petpost);
      this.petPostsChanged.next([...this.petposts]);
    });
  }
      
  updatePetPost(id:string,newPetPost:PetPost,image:File|string){
    let postData:PetPost| FormData;
    if(typeof(image)==='object'){
      postData=new FormData();
      postData.append("id",newPetPost.id);
      postData.append("name",newPetPost.name);
      postData.append("imagePath",image);
      postData.append("description",newPetPost.description)
    }else{
      newPetPost.imagePath=image;
      postData =newPetPost;
    }
    this.http.put<{message:string,imagePath:string}>("http://localhost:3000/api/petposts/"+id,postData )
    .subscribe((response)=>{
      const updatedPetPosts=[...this.petposts];
      const oldPetPostIndex=updatedPetPosts.findIndex(c=>c.id===id);
      newPetPost.imagePath=response.imagePath;
      console.log(response.imagePath);
      updatedPetPosts[oldPetPostIndex]=newPetPost;
      console.log(newPetPost);
      this.petposts=updatedPetPosts;
      this.petPostsChanged.next([...this.petposts]);
    });
  }
    

  deletePetPost(petpostId:String){
    this.http.delete("http://localhost:3000/api/petposts/"+petpostId)
    .subscribe((response)=>{
      console.log(response);
      const updatedPetPosts=this.petposts.filter(petpost=>petpost.id !== petpostId);
      this.petposts=updatedPetPosts;
      this.petPostsChanged.next([...this.petposts]);
      console.log('deleted');
    });
  }
}