import { Component, OnInit } from '@angular/core';

import { Store }        from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { Observable }   from 'rxjs';
import { map, take, tap, filter } from 'rxjs/operators';

import {

  LoginWithFacebook,
  LoginWithGoogle,

} from '@store/action/auth.action';
import { AuthState } from '@store/state/auth.state';

@Component({
	selector: 'app-login',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
	
	showSpinner: boolean = false;

	constructor(private store: Store) {
		store.select(AuthState.getUser).pipe(
			filter( user => !!user),
			tap(() => console.log('route from login page')),
			tap(logged => this.store.dispatch( new Navigate(['/']) ))
		).subscribe()
	}

	ngOnInit() {		
	}

	googleLogin() {
		this.store.dispatch(new LoginWithGoogle());
	}

	facebookLogin() {
		this.store.dispatch(new LoginWithFacebook());
	}

	tiwtterLogin() {
	}

}
