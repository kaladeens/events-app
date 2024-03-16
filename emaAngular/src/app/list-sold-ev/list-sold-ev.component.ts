import { Component ,OnInit} from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-sold-ev',
  templateUrl: './list-sold-ev.component.html',
  styleUrls: ['./list-sold-ev.component.css']
})
export class ListSoldEvComponent {
  events: any[] = [];
  constructor(private DatabaseService: DatabaseService,private router: Router) {}
  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
    this.DatabaseService.getSoldEvents().subscribe((data: any) => {
      this.events = data;
    });
  }
  
  goToEvent(id: any) {
    let url = ["/sam/event/" + id];
    this.router.navigate(url);
    
  }
}
