import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable, of }   from 'rxjs';
import { map, take, tap, filter, switchMap, skip } from 'rxjs/operators';
import { AuthService } from '@store/service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService) { }

  	canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {     
    	return this.authService.user.pipe(         		
    		// tap(_ => console.log(_)),
    	  	map(user => !!user),
    	  	tap(user =>  (!user ? this.authService.navigateToLogin() : console.log("[Auth Guard] accepted!")))
    	);   
  	}
}