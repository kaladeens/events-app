// list-categories.component.ts

import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
  categories: any[] = [];

  constructor(private databaseService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.databaseService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  goToCategory(id: any) {
    let url = ["/28872339/categories/display/" + id];
    this.router.navigate(url);
  }
}
