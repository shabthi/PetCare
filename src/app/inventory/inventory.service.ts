import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  uri = 'http://localhost:8080/items';

  constructor(private http: HttpClient) { }

  addItem(name, code, quantity, description, reorderLevel) {
    const obj = {
      name: name,
      code: code,
      quantity: quantity,
      description: description,
      reorderLevel: reorderLevel
    };
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }
}
