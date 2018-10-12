import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs';
@Component({
  selector: 'app-yesterday',
  templateUrl: './yesterday.component.html',
  styleUrls: ['./yesterday.component.scss']
})
export class YesterdayComponent implements OnInit {

	yesterday: Observable<any>;	
  constructor() { }

  ngOnInit() {
  	// this.yesterday = this.reviewService.getYesterdayNote();
  }

}
