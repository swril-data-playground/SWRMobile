export const defaultLanguage = 'en'

export enum KeychainServices {
  Salt = 'secret.wallet.salt',
  Key = 'secret.wallet.key',
  Cry = 'secret.crypto.key',
  seed = 'secret.crypto.seed',
  addr = 'crypto.address'
}

export enum KeyNames {
  PrivateKey = 'PrivateKey',
  PublicKey = "PublicKey",
  PublicAddress = "PublicAddress",
  SeedPhrase = "SeedPhrase"
}

// wallet timeout of 5 minutes, 0 means the wallet never locks due to inactivity
export const walletTimeout = 60000 * 5

export const walletId = 'walletId'

export const dateFormatOptions: { year: 'numeric'; month: 'short'; day: 'numeric' } = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}
