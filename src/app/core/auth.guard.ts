import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable, of }   from 'rxjs';
import { map, take, tap, filter, switchMap, skip } from 'rxjs/operators';
import { AuthService } from '@store/service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private router: Router, private authService: AuthService) { }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {     
    
    return this.authService.user.pipe(
       
      map(u => !!u),
      tap(u => {
        if (!u)  this.router.navigate(['/login']) 
      })
    );   
  }
}