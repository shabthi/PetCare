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
  uri = 'http://localhost:8080/petposts';

  constructor( private http:HttpClient){}
    
  getPetPosts(){
    this.http.get<{message:string,petposts:any}>(`${this.uri}`)
    .pipe(
      map((postData)=>{
        return postData.petposts.map(petpost=>{
          return {
            id:petpost._id,
            petname:petpost.petname,
            adoptername:petpost.adoptername,
            imagePath:petpost.imagePath,
            description:petpost.description,
            date:petpost.date
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
    return this.http.get<{_id:string,petname:string,adoptername:string,imagePath:string,description:string,date:string}>(`${this.uri}/`+id);
        
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
      postData.append("petname",petpost.petname);
      postData.append("adoptername",petpost.adoptername);
      postData.append("imagePath",image);
      postData.append("description",petpost.description);
      postData.append("date",petpost.date);
  
    this.http.post<{message:string,petpostId:string,imagePath:string}>(
      `${this.uri}/`,postData
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
      postData.append("petname",newPetPost.petname);
      postData.append("adoptername",newPetPost.adoptername);
      postData.append("imagePath",image);
      postData.append("description",newPetPost.description);
      postData.append("date",newPetPost.date);
    }else{
      newPetPost.imagePath=image;
      postData =newPetPost;
    }
    this.http.put<{message:string,imagePath:string}>(`${this.uri}/`+id,postData )
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
    this.http.delete(`${this.uri}/`+petpostId)
    .subscribe((response)=>{
      console.log(response);
      const updatedPetPosts=this.petposts.filter(petpost=>petpost.id !== petpostId);
      this.petposts=updatedPetPosts;
      this.petPostsChanged.next([...this.petposts]);
      console.log('deleted');
    });
  }
}