import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Item } from '../items/item';
import { InventoryService } from '../inventory.service';


@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  id: String;
  item: any = {};
  updateForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private inventoryservice: InventoryService,
    private fb: FormBuilder) { 
      this.createForm();
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id=params.id;
      this.inventoryservice.editItem(this.id).subscribe(res => {
        this.item = res;
        this.updateForm.get('name').setValue(this.item.name);
        this.updateForm.get('code').setValue(this.item.code);
        this.updateForm.get('quantity').setValue(this.item.quantity);
        this.updateForm.get('description').setValue(this.item.description);
        this.updateForm.get('reorderLevel').setValue(this.item.reorderLevel);
    });
  });
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required ],
      code: ['', Validators.required ],
      quantity: ['', Validators.required ],
      description: ['', Validators.required ],
      reorderLevel: ['', Validators.required ]
    });
  }

  updateItem(name, code, quantity, description, reorderLevel) {
    this.inventoryservice.updateItem(this.id, name, code, quantity, description, reorderLevel).subscribe(() => {
      this.router.navigate(['/items']);
    });
  }


}
