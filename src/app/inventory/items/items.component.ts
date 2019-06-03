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

  constructor(private inventoryservice: InventoryService ) { }

  ngOnInit() {
    this.fetchItems();
  }
   
  fetchItems(){
    this.inventoryservice
      .getItems()
      .subscribe((data: Item[]) => {
      this.items = data;
    });
  }

  deleteItem(id){
    this.inventoryservice.deleteItem(id).subscribe(()=>{
      this.fetchItems();
    });
    
  
  }

}
