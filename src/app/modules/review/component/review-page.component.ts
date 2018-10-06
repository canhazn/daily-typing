import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-review',
	templateUrl: './review-page.component.html',
	styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent implements OnInit {
	
	showSpinner: boolean = false;
	url: string;

	constructor(private location: Location, private route: Router) {
	}

	goBack(): void {
    	this.location.back();
  	}

	ngOnInit() {
    	this.url = this.route.url.split('/')[2];
    	console.log(this.url)		
	}

}
