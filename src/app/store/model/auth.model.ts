import { UserInfo } from 'firebase';

export type User = UserInfo;

// export type User = {
// 	displayName: string | null;
//     email?: string | null;
//     phoneNumber?: string | null;
//     photoURL: string | null;
//     providerId?: string;
//     uid: string;
// };

export interface AuthStateModel {
  initialized: boolean;
  user?: User;
  error?: string;
}
