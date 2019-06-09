import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '../../../../node_modules/@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '../../../../node_modules/@angular/forms';
import { PetPostService } from '../pet-post.service';
import { PetPost } from '../pet-post';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-add-pet-post',
  templateUrl: './add-pet-post.component.html',
  styleUrls: ['./add-pet-post.component.css']
})
export class AddPetPostComponent implements OnInit {

  id:string;
  editMode=false;
  angForm:FormGroup;
  imagePreview:string;
  datetime = new Date();
  date=this.datetime.toISOString().slice(0,10);

  constructor(private route:ActivatedRoute,private petPostService:PetPostService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = params['id'];
        this.editMode=params['id']!=null;
        this.initForm();
      }
    );
  }

  onSubmit(){
    const newPetPost=new PetPost(this.id,this.angForm.value['petname'],this.angForm.value['adoptername'],'',this.angForm.value['description'],this.date);
    
    const image=this.angForm.value['imagePath'];
 
    if(this.editMode){
      if(confirm("Edit the post!")){
        this.petPostService.updatePetPost(this.id,newPetPost,image);
        console.log(image);
        this.router.navigate(['/petPosts']);
      }
    }else{
      if(confirm("Create the post!")){
        this.petPostService.addPetPost(newPetPost,image);
        this.router.navigate(['/petPosts']);
      }
   }
  
 }


 private initForm(){
   let postPetName='';
   let postAdopterName='';
   let postImagePath='';
   let postDescription='';
   if(this.editMode){
     
    const petPost=this.petPostService.getPetPost(this.id);
       
    postPetName=petPost.petname;
    postAdopterName=petPost.adoptername;
    postImagePath=petPost.imagePath;
    postDescription=petPost.description;
         
  

   }
   console.log(postImagePath);
   this.angForm=new FormGroup({
     'petname':new FormControl(postPetName,Validators.required),
     'adoptername':new FormControl(postAdopterName,Validators.required),
     'imagePath':new FormControl(postImagePath,{validators:[Validators.required],asyncValidators:[mimeType]}),
     'description':new FormControl(postDescription,Validators.required)
     
   });

 }


 onImagePicked(event:Event){
   const file=(event.target as HTMLInputElement).files[0];
   this.angForm.patchValue({imagePath:file});
   this.angForm.get('imagePath').updateValueAndValidity();
   console.log(file);
   const reader=new FileReader();
   reader.onload=()=>{
     this.imagePreview=reader.result as string;
   };
   reader.readAsDataURL(file);

 }

}


