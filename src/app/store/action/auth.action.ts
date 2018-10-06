import { User } from '../model/auth.model';

// Actions
export class CheckSession {
  static type = '[Auth] CheckSession';
}

export class SessionChecked{
  static type = '[Auth} Session Checked';
  constructor(public user: User) {}
}

export class LoginWithGoogle {
  static type = '[User] LoginWithGoogle';
}

export class LoginWithFacebook {
  static type = '[User] LoginWithFacebook';
}

export class Logout {
  static type = '[User] Logout';
}

export class LogoutSuccess {
  static type = '[Auth] LogoutSuccess';
}

// Events
export class LoginRedirect {
  static type = '[Auth] LoginRedirect';
}

export class LoginSuccess {
  static type = '[Auth] LoginSuccess';
  constructor(public user: User) {}
}

export class LoginFailed {
  static type = '[Auth] LoginFailed';
  constructor(public error: any) {}
}

