import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-this-month',
  templateUrl: './this-month.component.html',
  styleUrls: ['./this-month.component.scss']
})
export class ThisMonthComponent implements OnInit {

	notes: Observable<any>;

  constructor() { }

  ngOnInit() {
  	
  }

}
