import { Action } from '@ngrx/store';
import { User } from './user.model';

export const GET_USER               = '[Auth] Get user';
export const AUTHENTICATED          = '[Auth] Authenticated';
export const NOT_AUTHENTICATED      = '[Auth] Not Authenticated';

export const GOOGLE_LOGIN           = '[Auth] Google login attempt';
export const FACEBOOK_LOGIN         = '[Auth] Facebook login attempt';
export const TIWTTER_LOGIN          = '[Auth] Tiwtter login attempt';
export const LOGOUT                 = '[Auth] Logout';

export const AUTH_ERROR             = '[Auth] Error';


export class GetUser implements Action {
    readonly type = GET_USER;
    constructor(public payload?: any) {}
}

export class Authenticated implements Action {
    readonly type = AUTHENTICATED;
    constructor(public payload?: any) {}
}

export class NotAuthenticated implements Action {
    readonly type = NOT_AUTHENTICATED;
    constructor(public payload?: any) {}
}

export class AuthError implements Action {
    readonly type = AUTH_ERROR;
    constructor(public payload?: any) {}
}

/// Google Login Actions

export class GoogleLogin implements Action {
    readonly type = GOOGLE_LOGIN;
    constructor(public payload?: any) {}
}

export class FacebookLogin implements Action {
    readonly type = FACEBOOK_LOGIN;
    constructor(public payload?: any) {}
}

export class TiwtterLogin implements Action {
    readonly type = TIWTTER_LOGIN;
    constructor(public payload?: any) {}
}

/// Logout Actions

export class LogOut implements Action {
    readonly type = LOGOUT;
    constructor(public payload?: any) {}
}


export type All
= GetUser
| Authenticated
| NotAuthenticated
| GoogleLogin
| FacebookLogin
| TiwtterLogin
| AuthError
| LogOut;
