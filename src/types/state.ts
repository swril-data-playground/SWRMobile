import { CredentialExchangeRecord as CredentialRecord } from '@aries-framework/core'

import { BifoldError } from './error'

export interface Onboarding {
  didCreatePIN: boolean
}
/*
export interface Preferences {
  useBiometry: boolean
}
*/

export interface Lockout {
  displayNotification: boolean
}

// FIXME: Once hooks are updated this should no longer be necessary
/*
export interface Credential {
  revoked: Set<CredentialRecord['id']>
  revokedMessageDismissed: Set<CredentialRecord['id']>
}
*/


export interface Privacy {
  didShowCameraDisclosure: boolean
}

export interface Authentication {
  didAuthenticate: boolean
}

export interface State {
  onboarding: Onboarding
  authentication: Authentication
  privacy: Privacy
  lockout: Lockout
  error: BifoldError | null
  loading: boolean
}
