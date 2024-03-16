import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  events: any[] = [];
  chosenEvent:any=null;
  name: string ="";
  capacity:any = null;
  constructor(private DatabaseService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
    this.DatabaseService.getEvents().subscribe((data: any) => {
      this.events = data;
    });
  }
  goToEvent(id: number) {
    let url = ["/sam/event/" + id];
    this.router.navigate(url);
  }
  updateEvent(){
    this.DatabaseService.updateEvent({
      name:this.name,
      eventID:this.chosenEvent.eventID,
      capacity:this.capacity
    }).subscribe({
      next: (response: any) => {
        console.log("DATA:",response);
        this.router.navigate(['/sam/events/list']);
      },
      error: (err:any)=>{
        console.log(err)
        this.router.navigate(['/invalid',{ errorMessage: err.error.message }]);
      }
    });
  }
}
