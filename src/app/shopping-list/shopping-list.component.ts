import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
 ingredients: Ingredient[] = [
   new Ingredient('eggs', 10),
   new Ingredient('cheese', 5)
 ];
  constructor() { }

  ngOnInit(): void {
  }

}
