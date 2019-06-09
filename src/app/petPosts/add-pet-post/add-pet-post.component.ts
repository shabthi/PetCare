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
    const newPetPost=new PetPost(this.id,this.angForm.value['name'],'',this.angForm.value['description']);
    
    const image=this.angForm.value['imagePath'];
 
    if(this.editMode){
     this.petPostService.updatePetPost(this.id,newPetPost,image);
     console.log(image);
     this.router.navigate(['/petPosts']);
    }else{
     this.petPostService.addPetPost(newPetPost,image);
     this.router.navigate(['/petPosts']);
     
   }
  
 }


 private initForm(){
   let postName='';
   let postImagePath='';
   let postDescription='';
   if(this.editMode){
     
    const petPost=this.petPostService.getPetPost(this.id);
       
    postName=petPost.name;
    postImagePath=petPost.imagePath;
    postDescription=petPost.description;
         
  

   }
   console.log(postImagePath);
   this.angForm=new FormGroup({
     'name':new FormControl(postName,Validators.required),
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


