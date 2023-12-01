import { Configuration } from 'msal'
import {
  B2C_EDIT_PROFILE,
  B2C_RESET_PASSWORD, B2C_SCOPES, B2C_SIGNIN,
  B2C_SIGNUP, MSAL_CLIENT_ID, MSAL_REDIRECT_LOGOUT, MSAL_REDIRECT_URI
} from '../config'


export const b2cPolicies = {
  names: {
    signUp: 'B2C_1_SignUpOnboarding',
    signIn: 'B2C_1_SignInOnboarding',
    resetPassword: 'B2C_1_ResetOnboarding',
    editProfile: 'B2C_1_EditProfileOnboarding',
  },
  authorities: {
    signUp: {
      authority: B2C_SIGNUP,
    },
    signIn: {
      authority: B2C_SIGNIN,
    },
    resetPassword: {
      authority: B2C_RESET_PASSWORD,
    },
    editProfile: {
      authority: B2C_EDIT_PROFILE,
    },
  },
}

export const apiConfig = {
  b2cScopes: B2C_SCOPES,
}

export const msalConfig: Configuration = {
  auth: {
    clientId: MSAL_CLIENT_ID || '',
    authority: b2cPolicies.authorities.signIn.authority,
    redirectUri: MSAL_REDIRECT_URI,
    postLogoutRedirectUri: MSAL_REDIRECT_LOGOUT,
    navigateToLoginRequestUrl: true,
    validateAuthority: false,
  },
  cache: {
    cacheLocation: 'localStorage',
  },
}

export const loginRequest = {
  scopes: ['openid', 'profile'],
  extraQueryParameters: { ui_locales: 'es' },
}
