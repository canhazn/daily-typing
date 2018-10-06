import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable, of }   from 'rxjs';
import { map, take, tap, filter, switchMap, skip } from 'rxjs/operators';

import { Store, Select } from '@ngxs/store';
import { LoginRedirect } from '@store/action/auth.action';
import { AuthState } from '@store/state/auth.state';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private router: Router, private store: Store) { }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {     
    
   return this.store.select(AuthState.getInitialized).pipe(
      filter(initialized => initialized),
      switchMap(() => this.store.select(AuthState.getUser)),
      map(u => !!u),
      tap(u => {
        if (!u)  this.store.dispatch(new LoginRedirect());        
      })
    );   
  }
}


 // return this.store.select(AuthState.getInitialized).pipe(
 //      filter(initialized => initialized),
 //      switchMap(() => this.store.selectOnce(AuthState.getUser)),
 //      skip(1),
 //      map(u => !!u),
 //      tap(u => {
 //        if (!u) {
 //          console.log("errrrrrrrrrrr");
 //          this.store.dispatch(new LoginRedirect());
 //        }
 //      })
 //    );   


   // return this.store.selectOnce(AuthState.getUser).pipe(
   //    map(u => !!u),
   //    tap(u => {
   //      if (!u) {
   //        console.log("errrrrrrrrrrr");
   //        this.store.dispatch(new LoginRedirect());
   //      }
   //    })
   //  );   