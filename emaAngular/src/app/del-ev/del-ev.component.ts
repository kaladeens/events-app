import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-del-ev',
  templateUrl: './del-ev.component.html',
  styleUrls: ['./del-ev.component.css']
})
export class DelEvComponent implements OnInit{
  events: any[] = [];
  constructor(private DatabaseService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.getEvents();
  }
  getEvents(){
    this.DatabaseService.getEvents().subscribe((data: any) => {
      this.events = data;
    });
  }
  deleteEvent(eventID:number){
    this.DatabaseService.deleteEvent(eventID).subscribe((response:any)=>{
      console.log(response);
      this.getEvents();
    });
  }
}
