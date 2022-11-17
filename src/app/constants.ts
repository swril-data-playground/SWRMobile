export const defaultLanguage = 'en'

// Used to property prefix TestIDs so they can be looked up
// by on-device automated testing systems like SauceLabs.
export const testIdPrefix = 'com.ariesbifold:id/'

export enum LocalStorageKeys {
  //Onboarding = 'OnboardingState',
  Privacy = 'PrivacyState',
  // FIXME: Once hooks are updated this should no longer be necessary
  //RevokedCredentials = 'RevokedCredentials',
  //RevokedCredentialsMessageDismissed = 'RevokedCredentialsMessageDismissed',
  Preferences = 'PreferencesState',
}

export enum KeychainServices {
  Salt = 'secret.wallet.salt',
  Key = 'secret.wallet.key',
  Cry = 'secret.crypto.key',
  seed = 'secret.crypto.seed',
  addr = 'crypto.address'
}

// wallet timeout of 5 minutes, 0 means the wallet never locks due to inactivity
export const walletTimeout = 60000 * 5

export const walletId = 'walletId'

export const dateFormatOptions: { year: 'numeric'; month: 'short'; day: 'numeric' } = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}

export const minPINLength = 6

export const InjectionSymbols = {
  MessageRepository: Symbol('MessageRepository'),
  StorageService: Symbol('StorageService'),
  Logger: Symbol('Logger'),
  AgentContextProvider: Symbol('AgentContextProvider'),
  AgentDependencies: Symbol('AgentDependencies'),
  Stop$: Symbol('Stop$'),
  FileSystem: Symbol('FileSystem'),
  Wallet: Symbol('Wallet'),
}

export const DID_COMM_TRANSPORT_QUEUE = 'didcomm:transport/queue'