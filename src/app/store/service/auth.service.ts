import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

import { Router } from '@angular/router';
// import { NotifyService } from './notify.service';

import { Observable, of, Subject } from 'rxjs';
import { switchMap, filter, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;

  private _usedEmail = new Subject< string | null>();
  usedEmail = this._usedEmail.asObservable();
  private pendingCred : auth.AuthCredential;

  constructor( private afAuth: AngularFireAuth, private router: Router ) {
    // console.log(this.user);
    this.user = this.afAuth.user
  }

  navigateToHome()  { this.router.navigate(['/'])      }
  navigateToLogin() { this.router.navigate(['/login']) }

  login(method: 'google.com'| 'facebook.com' | 'twitter.com') {    
    this.oAuthLogin(this.getProviderFormMethod(method))
      .then()
      .catch(error => this.handleError(error));
  }

  logout() {
    this.afAuth.auth.signOut().then(_ => this.navigateToLogin());
  }

  linkAuthProvider() {

    let provider = this.getProviderFormMethod('google.com');
    // let pendingCred = this.pendingCred;

    this.oAuthLogin(provider).then( result => {        
      result.user.linkAndRetrieveDataWithCredential(this.pendingCred).then( usercred => {
        // Google account successfully linked to the existing Firebase user.        
      });
    })        

  }

  //  If method, return provider
  private getProviderFormMethod(method: string) {
    switch (method) {
      case "google.com":     return new auth.GoogleAuthProvider()
      case "facebook.com":   return new auth.FacebookAuthProvider()
      case "twitter.com":    return new auth.TwitterAuthProvider()
      default: return; 
    }
  }


  // //  If email, return provider
  // private getProviderForProviderId(email: string) {
  //   return this.afAuth.auth.fetchSignInMethodsForEmail(email)
  //     .then( ([method]) => this.getProviderFormMethod(method))
  // }

  // Login with Popup
  private oAuthLogin(provider: any) {
    return this.afAuth.auth.signInWithPopup(provider)      
  }

  // If error, console log and notify user  
  private async handleError(error) {
    console.error(error);

    if (error.code === 'auth/account-exists-with-different-credential') {
      let email: string = error.email;          
      this.pendingCred = error.credential;    
      this._usedEmail.next( email );      
    }
  }
}