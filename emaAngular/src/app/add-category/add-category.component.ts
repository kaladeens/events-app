import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

interface Category {
  "name": string,
  "description": string,
  "image": any
}

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {
  category: Category = {
    "name": "",
    "description": "",
    "image": undefined
  };

  constructor(private databaseService: DatabaseService, private router: Router) {}

  ngOnInit(): void {}

  addCategory() {
    console.log("Adding category:", this.category);
    this.databaseService.addCategory(this.category).subscribe({
      next: (response: any) => {
        console.log("Category added:", response);
        this.router.navigate(['/categories/list']);
      },
      error: (err: any) => {
        console.log(err);
        this.router.navigate(['/invalid', { errorMessage: err.error.message }]);
      }
    });
  }
}
