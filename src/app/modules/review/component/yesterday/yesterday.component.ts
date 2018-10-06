import { Component, OnInit } from '@angular/core';

import { ReviewService } from '../../review.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-yesterday',
  templateUrl: './yesterday.component.html',
  styleUrls: ['./yesterday.component.scss']
})
export class YesterdayComponent implements OnInit {

	yesterday: Observable<any>;	
  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
  	this.yesterday = this.reviewService.getYesterdayNote();
  }

}
