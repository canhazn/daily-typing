import * as userActions from './auth.actions';
import { User } from './user.model';

export type Action = userActions.All;

const defaultUser : User = { uid: null, displayName: null, photoURL: null }

/// Reducer function
export function authReducer(state , action: Action) {
  switch (action.type) {

    case userActions.GET_USER:
        return { ...state};

    case userActions.AUTHENTICATED:
        return { ...state, ...action.payload, error: null };
        
    case userActions.NOT_AUTHENTICATED:
        return { ...state, ...defaultUser };

    // case userActions.GOOGLE_LOGIN:
    //   return { ...state };

    // case userActions.FACEBOOK_LOGIN:
    //   return { ...state };

    // case userActions.TIWTTER_LOGIN:
    //   return { ...state };

    case userActions.AUTH_ERROR:
      return { ...state, ...action.payload };

    // case userActions.LOGOUT:
    //   return { ...state };

    default: 
      return state;
  }
}  