import { Component , OnInit} from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

interface Event {
  "name": string,
  "description": string,
  "date": string,
  "duration": number,
  "isActive":any,
  "image":any,
  "capacity":any,
  "ticketsAvailable":any,
  "categoryList": any

}
@Component({
  selector: 'app-add-ev',
  templateUrl: './add-ev.component.html',
  styleUrls: ['./add-ev.component.css']
})
export class AddEvComponent implements OnInit {
  event: Event = {
    "name": "",
    "description": "",
    "date": "",
    "duration": 0,
    "isActive":true,
    "image":undefined,
    "capacity":undefined,
    "ticketsAvailable":undefined,
    "categoryList": ""
  };
  constructor(private databaseService: DatabaseService, private router: Router) {
  }
  ngOnInit(): void {
  }
  addEvent(){

    console.log("logged:",this.event);
    this.databaseService.addEvent(this.event).subscribe({
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
