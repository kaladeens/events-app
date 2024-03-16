import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimePipe } from '../pipes/time.pipe';
@Component({
  selector: 'app-invalid-data',
  templateUrl: './invalid-data.component.html',
  styleUrls: ['./invalid-data.component.css']
})

export class InvalidDataComponent {
  errorMessage: any;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      
      this.errorMessage = params.get('errorMessage');
      console.log("in error",this.errorMessage)
    });
  }
}
