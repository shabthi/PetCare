export class PetPost{
    public id:string;
    public petname:string;
    public adoptername:string;
    public imagePath:string;
    public description:string;
    public date:string;
    

    constructor(id:string,petname:string,adoptername:string,img:string,desc:string, date:string,
       
   ){
       this.id=id;
       this.petname=petname;
       this.adoptername=adoptername;
       this.imagePath=img;
       this.description=desc;
       this.date=date;
       
    }
}