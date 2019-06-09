import { Component, OnInit } from '@angular/core';
import { Item } from '../items/item';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-items-need',
  templateUrl: './items-need.component.html',
  styleUrls: ['./items-need.component.css']
})
export class ItemsNeedComponent implements OnInit {

  reorderItems: Item[];

  constructor(private inventoryservice: InventoryService) { }

  ngOnInit() {
    this.fetchReorderItems();
  }

  fetchReorderItems(){
    this.inventoryservice
    .getReorderItems()
    .subscribe((data:Item[])=>{
      this.reorderItems=data;
    });
  }
}
