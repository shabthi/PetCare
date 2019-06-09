export class PetPost{
    public id:string;
    public name:string;
    public imagePath:string;
    public description:string;
    

    constructor(id:string,name:string,img:string,desc:string,
       
   ){
       this.id=id;
       this.name=name;
       this.imagePath=img;
       this.description=desc;
       
    }
}