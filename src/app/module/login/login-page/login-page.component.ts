import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@store/service/auth.service';

import { Observable }   from 'rxjs';
import { map, take, tap, filter } from 'rxjs/operators';


@Component({
	selector: 'app-login',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
	
	showSpinner: boolean = false;

	constructor(private authService: AuthService) {

	}

	ngOnInit() {	
		this.authService.user.pipe(
			filter( user => !!user),
			tap(_ => console.log('route from login page')),
			tap(logged => this.authService.loggedinRedirect())
		).subscribe()	
	}

	googleLogin() {
		this.authService.googleLogin();
	}

	facebookLogin() {
		
	}

	tiwtterLogin() {
	}

}
