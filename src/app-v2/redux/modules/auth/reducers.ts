import {AnyAction, combineReducers} from 'redux';

import {UserData} from '../../../models/auth/types';
import {
  ResendOTPCommand,
  ResendOTPFailedEvent,
  SignInWithEmailCommand,
  SignInWithSocialCommand,
  UserDataDocument,
  UserSignedInWithEmailEvent,
  UserSignedInWithSocialEvent,
  UserSignInFailedEvent,
  VerifyEmailOTPCommand,
  VerifyOTPFailedEvent,
} from './actions';
import {socialDataReducer} from './social-data';

export const userDataReducer = (userData: UserData | null = null, action: AnyAction) => {
  if (action.type === UserDataDocument.type) {
    return action.payload;
  }
  return userData;
};

export const authErrorReducer = (error: string | null = null, action: AnyAction) => {
  switch (action.type) {
    case UserSignInFailedEvent.type:
    case VerifyOTPFailedEvent.type:
    case ResendOTPFailedEvent.type:
      return action.payload;
    case SignInWithEmailCommand.type:
    case SignInWithSocialCommand.type:
    case VerifyEmailOTPCommand.type:
    case ResendOTPCommand.type:
    case UserDataDocument.type:
    case UserSignedInWithEmailEvent.type:
    case UserSignedInWithSocialEvent.type:
      return null;
    default:
      return error;
  }
};

export const authPendingReducer = (pending: boolean = false, action: AnyAction): boolean => {
  switch (action.type) {
    case VerifyEmailOTPCommand.type:
    case ResendOTPCommand.type:
      return true;
    case UserDataDocument.type:
    case UserSignInFailedEvent.type:
    case VerifyOTPFailedEvent.type:
    case ResendOTPFailedEvent.type:
    case UserSignedInWithEmailEvent.type:
    case UserSignedInWithSocialEvent.type:
      return false;
    default:
      return pending;
  }
};

export const authReducer = combineReducers({
  userData: userDataReducer,
  authError: authErrorReducer,
  authPending: authPendingReducer,
  socialData: socialDataReducer,
});
