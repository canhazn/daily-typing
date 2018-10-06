import { Injectable }                 					from '@angular/core';
import { Effect, Actions }            					from '@ngrx/effects';
					
import { AngularFireAuth }            					from '@angular/fire/auth';
import { auth } 																from 'firebase';

// import { IUser } from './user.model';

import { Observable, of, from }                 from 'rxjs';
import { map, switchMap, catchError, delay, take } 		from 'rxjs/operators';

import { User } from './user.model';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import * as userActions from './auth.actions';

export type Action = userActions.All;


@Injectable()
export class AuthEffects {

  constructor(private actions: Actions, private afAuth: AngularFireAuth) {}

  /// effects go here

  @Effect()
  getUser$:  Observable<Action> = this.actions.ofType(userActions.GET_USER).pipe(
    map((action: userActions.GetUser) => action.payload ),
    switchMap(payload => this.getUser() ),    
    take(1),
    map( authData => {       
         if (authData) {               
             const user : User = {
                uid: authData.uid, 
                displayName: authData.displayName, 
                photoURL:  authData.photoURL 
             }
             return new userActions.Authenticated(user);
         } else {               
             return new userActions.NotAuthenticated();
         }
    }),
    catchError(err =>  of(new userActions.AuthError({error: err.message})) )
  )

  @Effect()
  googleLogin$:  Observable<Action> = this.actions.ofType(userActions.GOOGLE_LOGIN).pipe(
     map((action: userActions.GoogleLogin) => action.payload),
     switchMap(payload => {
         return from( this.googleLogin() );
     }),
     map( credential => credential.user),
     map( authData => {
        const user : User = {
             uid: authData.uid, 
             displayName: authData.displayName, 
             photoURL:  authData.photoURL 
          }
          return new userActions.Authenticated(user);
     }),
     catchError(err => {
         return of(new userActions.AuthError({error: err.message}))
     })
  )

  @Effect()
  facebookLogin$:  Observable<Action> = this.actions.ofType(userActions.FACEBOOK_LOGIN).pipe(
     map((action: userActions.GoogleLogin) => action.payload),
     switchMap(payload => {
         return from( this.facebookLogin() );
     }),
     map( credential => credential.user),
     map( authData => {
        const user : User = {
             uid: authData.uid, 
             displayName: authData.displayName, 
             photoURL:  authData.photoURL 
          }
          return new userActions.Authenticated(user);
     }),
     catchError(err =>  of(new userActions.AuthError({error: err.message})) )
  )

  @Effect()
  tiwtterLogin$:  Observable<Action> = this.actions.ofType(userActions.TIWTTER_LOGIN).pipe(
     map((action: userActions.GoogleLogin) => action.payload),
     switchMap(payload => {
         return from( this.twitterLogin() );
     }),
     map( credential => {
         // successful login
         return new userActions.Authenticated(credential);
     }),
     catchError(err =>  of(new userActions.AuthError({error: err.message})) )
  )

  @Effect()
  logout$:  Observable<Action> = this.actions.ofType(userActions.LOGOUT).pipe(
    map((action: userActions.LogOut) => action.payload ),
    switchMap(payload => {
      return of( this.logOut() );
    }),
    map( authData => {
      return new userActions.NotAuthenticated();
    }),
    catchError(err => of(new userActions.AuthError({error: err.message})) )
  )

  private getUser() {
    return this.afAuth.user;
  }

  private googleLogin() {
    const provider = new auth.GoogleAuthProvider();    
    return this.afAuth.auth.signInWithPopup(provider);
  }

  private facebookLogin() {
    const provider = new auth.FacebookAuthProvider();        
    return this.afAuth.auth.signInWithPopup(provider);
  }

  private twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  private logOut() {
    this.afAuth.auth.signOut()
  }

}