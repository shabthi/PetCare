import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../inventory/items/item';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  // uri = 'http://localhost:8080/items';
  uri = 'http://localhost:3000/items';

  constructor(private http: HttpClient) { }

  addItem(name, code, quantity, description, reorderLevel) {
    const obj = {
      name: name,
      code: code,
      quantity: quantity,
      description: description,
      reorderLevel: reorderLevel
    };
    return this.http.post(`${this.uri}/add`, obj);
       // .subscribe(res => console.log('Done'));
  }

  getItems() {
    return this.http.get(`${this.uri}`);
  }

  editItem(id) {
    return this
              .http
              .get(`${this.uri}/edit/${id}`);
    }
  
  updateItem(id, name, code, quantity, description, reorderLevel) {
    const obj = {
      name: name,
      code: code,
      quantity: quantity,
      description: description,
      reorderLevel: reorderLevel
    };
    return this
      .http
      .post(`${this.uri}/update/${id}`, obj);
      // .subscribe(res => console.log('Done'));
  }

  deleteItem(id) {
    return this
              .http
              .get(`${this.uri}/delete/${id}`);
  }

  getReorderItems() {
    return this.http.get(`${this.uri}/reorderItems`);
  }
    
}
