import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  // not null numbers
  events!: number;
  categories!: number;
  add!: number;
  delete!: number;
  update!: number;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.databaseService.getCounts().subscribe((counters: any) => {
      this.events = counters.events;
      this.categories = counters.categories;
    });
    this.databaseService.getOPCounts().subscribe((OPcounts: any) => {
      this.add = OPcounts.add;
      this.delete = OPcounts.delete;
      this.update = OPcounts.update;
    });
  }
}
