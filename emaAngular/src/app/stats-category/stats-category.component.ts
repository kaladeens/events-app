import { Component , OnInit} from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats-category',
  templateUrl: './stats-category.component.html',
  styleUrls: ['./stats-category.component.css']
})
export class StatsCategoryComponent implements OnInit {
  totalCategories: number = 0;
  totalEvents: number = 0;

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.dbService.getCategoryStats().subscribe((data: any) => {
      this.totalCategories = data.totalCategories;
      this.totalEvents = data.totalEvents;
  });
  }
}