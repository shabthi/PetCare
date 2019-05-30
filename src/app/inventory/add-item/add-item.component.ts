import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { InventoryService } from '../../inventory/inventory.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  angForm:FormGroup;

  constructor(private inventoryservice: InventoryService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      code: ['', Validators.required ],
      quantity: ['', Validators.required ],
      description: ['', Validators.required ],
      reorderLevel: ['', Validators.required ]
   });
  }

  addItem(name, code, quantity, description, reorderLevel) {
    this.inventoryservice.addItem(name, code, quantity, description, reorderLevel);
  }

  ngOnInit() {
  }

}

