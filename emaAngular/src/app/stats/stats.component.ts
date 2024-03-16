import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  create!: number;
  delete!: number;
  update!: number;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    
    this.databaseService.getOPCounts().subscribe((OPcounts: any) => {
      this.create = OPcounts.add;
      this.delete = OPcounts.delete;
      this.update = OPcounts.update;
    });
  }
} 