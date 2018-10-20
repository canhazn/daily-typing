import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

import { Router } from '@angular/router';
// import { NotifyService } from './notify.service';

import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any> ;

  constructor( private afAuth: AngularFireAuth, private router: Router ) {

    this.user = this.afAuth.user.pipe(
      // startWith(JSON.parse(localStorage.getItem('user'))),
      // tap(user => console.log(user)),
      // tap(user => {
      //   if (user) 
      //     localStorage.setItem('user', JSON.stringify(user))
      //   else 
      //     localStorage.removeItem('user')        
      // }),
    )
  }
  ////// OAuth Methods /////

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();    
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();        
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then( () => {
        this.loggedinRedirect()
      })
      .catch(error => this.handleError(error));
  }

  loggedinRedirect() {
    this.router.navigate(['/']);    
  }

  loginRedirect() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.loginRedirect();
    });
  }

  // If error, console log and notify user
  private handleError(error) {
    console.error(error);
    // if (error.code === 'auth/account-exists-with-different-credential') {
    //   var pendingCred = error.credential;
    // }
  }
}