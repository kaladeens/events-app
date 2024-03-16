import { Component , OnInit} from '@angular/core';
import { DatabaseService } from '../database.service';
import { TimePipe } from '../pipes/time.pipe';
import { ListCatPipe } from '../pipes/list-cat.pipe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-ev',
  templateUrl: './list-ev.component.html',
  styleUrls: ['./list-ev.component.css']
})
export class ListEvComponent implements OnInit {
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
  goToEvent(id: any) {
    let url = ["/sam/event/" + id];
    this.router.navigate(url);
    
  }
}
