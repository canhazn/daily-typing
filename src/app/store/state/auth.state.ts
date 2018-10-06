import { ApplicationRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { take, tap, filter, switchMap } from 'rxjs/operators';

import {
  CheckSession,
  SessionChecked,
  LoginWithFacebook,
  LoginWithGoogle,
  LoginFailed,
  LoginRedirect,
  LoginSuccess,
  Logout,
  LogoutSuccess,
} from '@store/action/auth.action';
import { AuthStateModel, User } from '@store/model/auth.model';


@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    initialized: false,
    // user: null,
  }
})
export class AuthState implements NgxsOnInit {

  constructor(private store: Store, private afAuth: AngularFireAuth) {}

  /**
   * Selectors
   */
  @Selector()
  static getInitialized(state: AuthStateModel): boolean {
    return state.initialized;
  }

  @Selector()
  static getUser(state: AuthStateModel) { 
    return state.user;
  }

  /**
   * Dispatch CheckSession on start
   */
  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new CheckSession());
  }

  /**
   * Commands
   */
  @Action(CheckSession)
  checkSession(ctx: StateContext<AuthStateModel>) {
    return this.afAuth.authState.pipe(
      take(1),
      tap((user: User) => {        
        ctx.dispatch(new SessionChecked(user));
      })
    );
  }

  @Action(SessionChecked)
  onSessionChecked(ctx: StateContext<AuthStateModel>, event: SessionChecked) {
    let user: User = event.user;
    if(user) ctx.patchState({ user });
    ctx.patchState({ initialized: true });
  }

  @Action(LoginWithGoogle)
  loginWithGoogle(ctx: StateContext<AuthStateModel>) {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(
      (response: { user: User }) => {
        ctx.dispatch(new LoginSuccess(response.user));
      })
      .catch(error => {
        ctx.dispatch(new LoginFailed(error));
      });
  }

  @Action(LoginWithFacebook)
  loginWithFacebook(ctx: StateContext<AuthStateModel>) {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(
      (response: { user: User }) => {
        ctx.dispatch(new LoginSuccess(response.user));
      })
      .catch(error => {
        ctx.dispatch(new LoginFailed(error));
      });
  }


  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.afAuth.auth.signOut().then(
      () => {
        ctx.dispatch(new LogoutSuccess());
      });
  }

  /**
   * Events
   */

  @Action(LoginSuccess)
  onLoginSuccess(ctx: StateContext<AuthStateModel>) {    
    ctx.dispatch(new Navigate(['/']));
    // this.router.navigate(['/']);
  }

  @Action(LoginRedirect)
  onLoginRedirect(ctx: StateContext<AuthStateModel>) {   
    ctx.dispatch(new Navigate(['/login']));
    // this.router.navigate(['/login'])
  }

  @Action(LoginSuccess)
  setUserStateOnSuccess(ctx: StateContext<AuthStateModel>, event: LoginSuccess) {
    let user: User = event.user;
    ctx.patchState({ user });
  }

  @Action(LoginFailed) 
  onLoginFailed(ctx: StateContext<AuthStateModel>, event: LoginFailed) {
    ctx.patchState({ error: event.error })
  }

  @Action(LogoutSuccess)
  onLogout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ user: null });
    ctx.dispatch(new LoginRedirect());
  }
}
