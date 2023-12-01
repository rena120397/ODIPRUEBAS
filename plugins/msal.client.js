import Vue from 'vue'
import MSAL from 'vue-msal'
import {
  MSAL_CLIENT_ID,
  MSAL_REDIRECT_URI,
  MSAL_REDIRECT_LOGOUT,
  B2C_SCOPES
} from '../config'

export default (_, inject) => {
  inject(
    'msal',
    new MSAL(
      {
        auth: {
          clientId: MSAL_CLIENT_ID || '',
          redirectUri: MSAL_REDIRECT_URI,
          postLogoutRedirectUri: MSAL_REDIRECT_LOGOUT,
          validateAuthority: false,
          authority: B2C_SIGNUP,
          navigateToLoginRequestUrl: true,
        },
        cache: {
          cacheLocation: 'localStorage',
        },
        request: {
          scopes: B2C_SCOPES,
        },
      },
      Vue
    )
  )
}
