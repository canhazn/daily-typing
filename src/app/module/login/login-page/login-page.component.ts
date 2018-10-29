import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@store/service/auth.service';

import { Observable }   from 'rxjs';
import { map, take, tap, filter, debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-login',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
	

	usedEmail;
	constructor(private authService: AuthService) {}

	ngOnInit() {	
		this.authService.user.pipe(
			filter( user => !!user),
			take(1),			
			tap(logged => this.authService.navigateToHome())
		).subscribe();

		// can't bind this.usedEmail = this.authService.usedEmail bacause temple parse "error"
		this.authService.usedEmail.pipe(
			take(1),
			tap(usedEmail => this.usedEmail = usedEmail)
		).subscribe();		
	}

	login(method: 'google.com'| 'facebook.com' | 'twitter.com') {
		this.authService.login(method);
	}

	link() {
	    this.authService.linkAuthProvider();	 
	}
}
