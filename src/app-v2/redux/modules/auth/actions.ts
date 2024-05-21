import jwtDecode from 'jwt-decode';

import {SupportedAuthProviders, UserData} from '../../../models/auth/types';
import {BaseAction} from '../../base/BaseAction';
import {AUTH} from './constants';

export class RestoreUserDataCommand extends BaseAction {
  static type = `${AUTH} Restore user data`;
}

export class UserDataRestoredEvent extends BaseAction {
  static type = `${AUTH} User data restored`;
}

export class UserDataRestorationFailedEvent {
  static type = `${AUTH} User data restoration failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class SignInWithEmailCommand {
  static type = `${AUTH} Sign in with email`;
  static create(email: string) {
    return {
      type: this.type,
      payload: email,
    };
  }
}

export class UserSignedInWithEmailEvent {
  static type = `${AUTH} User signed in with email`;
  static create(email: string) {
    return {
      type: this.type,
      payload: email,
    };
  }
}

export class SignInWithSocialCommand {
  static type = `${AUTH} Sign in with social`;
  static create(authProvider: SupportedAuthProviders) {
    return {
      type: this.type,
      payload: authProvider,
    };
  }
}

export class UserSignedInWithSocialEvent {
  static type = `${AUTH} User signed in with social`;
  static create(userData: UserData) {
    return {
      type: this.type,
      payload: userData,
    };
  }
}

export class VerifyOtpCommand {
  static type = `${AUTH} Verify OTP`;
  static create(code: string) {
    return {
      type: this.type,
      payload: code,
    };
  }
}

export class VerifyEmailOTPCommand {
  static type = `${AUTH} Verify email OTP`;
  static create(code: string) {
    return {
      type: this.type,
      payload: code,
    };
  }
}

export class VerifySocialOTPCommand {
  static type = `${AUTH} Verify social OTP`;
  static create(code: string) {
    return {
      type: this.type,
      payload: code,
    };
  }
}

export class VerifyOTPSuccessEvent {
  static type = `${AUTH} Verify OTP success`;
  static create(userData: Partial<UserData>) {
    return {
      type: this.type,
      payload: userData,
    };
  }
}

export class VerifyOTPFailedEvent {
  static type = `${AUTH} Verify OTP failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class ResendOTPCommand extends BaseAction {
  static type = `${AUTH} Resend OTP code`;
}

export class ResendOTPFailedEvent {
  static type = `${AUTH} Resend OTP code failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class UserSignInFailedEvent {
  static type = `${AUTH} User sign in failed`;
  static create(message: string) {
    return {
      type: this.type,
      payload: message,
    };
  }
}

export class UserDataDocument {
  static type = `${AUTH} User data`;
  static create(userData: UserData | null) {
    if (userData?.token) {
      const {id} = jwtDecode<{id: string}>(userData.token);
      userData.id = id.toString();
    }

    return {
      type: this.type,
      payload: userData,
    };
  }
}

export class ClearUserDataCommand extends BaseAction {
  static type = `${AUTH} Clear user data`;
}

export class SignOutCommand extends BaseAction {
  static type = `${AUTH} Sign out`;
}
