import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];
  reorderItems: Item[];
  
  constructor(private inventoryservice: InventoryService ) { }

  ngOnInit() {
    this.fetchItems();
    this.fetchReorderItems();
  }
   
  fetchItems(){
    this.inventoryservice
      .getItems()
      .subscribe((data: Item[]) => {
      this.items = data;
    });
  }

  deleteItem(id){
    if(confirm("Delete the item!")){
      this.inventoryservice.deleteItem(id).subscribe(()=>{
        this.fetchItems();
        this.fetchReorderItems();
      });
    }

  }
// if (confirm("Press a button!")) {
//     txt = "You pressed OK!";
//   } else {
//     txt = "You pressed Cancel!";
//   }
  fetchReorderItems(){
    this.inventoryservice
    .getReorderItems()
    .subscribe((data:Item[])=>{
      this.reorderItems=data;
    });
  }

}
