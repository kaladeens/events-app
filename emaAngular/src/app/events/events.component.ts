import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit{
  id: any = null;
  event :any;
  constructor(private DatabaseService:DatabaseService,private route :ActivatedRoute,private router:Router){
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = params['eventID'];
    })
    this.getEventData(this.id);
  }

  getEventData(id:any){
    this.DatabaseService.getEvent(id).subscribe((data:any) =>{
      if (data){      
        this.event=data;
      }
      else{
        this.router.navigate(['/404'])
      }
    })
  }

}
