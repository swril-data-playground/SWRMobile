import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import Keychain, { getSupportedBiometryType } from 'react-native-keychain'
import uuid from 'react-native-uuid'

import {KeychainServices} from '../constants'
import { WalletSecret } from '/home/narukirito/SWRMobileAries/src/types/security'
import { hashPIN } from '/home/narukirito/SWRMobileAries/src/utils/crypto'
import { seedphr , keys , prikey } from '/home/narukirito/SWRMobileAries/src/types/security'
const keyFauxUserName = 'WalletFauxPINUserName'
const saltFauxUserName = 'WalletFauxSaltUserName'

export interface WalletSalt {
  id: string
  salt: string
}

export interface WalletKey {
  key: string
}

export const optionsForKeychainAccess = (service: KeychainServices, useBiometrics = false): Keychain.Options => {
  const opts: Keychain.Options = {
    accessible: useBiometrics ? Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY : Keychain.ACCESSIBLE.ALWAYS,
    service,
  }

  if (useBiometrics) {
    opts.accessControl = Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE
  }

  if (Platform.OS === 'android') {
    opts.securityLevel = Keychain.SECURITY_LEVEL.ANY
    if (!useBiometrics) {
      opts.storage = Keychain.STORAGE_TYPE.AES
    } else {
      opts.storage = Keychain.STORAGE_TYPE.RSA
    }
  }

  return opts
}

export const secretForPIN = async (walletId: string , pin: string, salt?: string): Promise<WalletSecret> => {
  const mySalt = salt ?? uuid.v4().toString()
  const myKey = await hashPIN(pin, mySalt)
  const secret: WalletSecret = {
    id: walletId,
    key: myKey.toString(),
    salt: mySalt,
  }

  return secret
}

export const storeCryptoKey = async (key:keys) => {
 
  const opts = optionsForKeychainAccess(KeychainServices.Cry , false)
  const result = await Keychain.setGenericPassword(key.publick , key.privatek)
  return typeof result ==='boolean' ? false : true

}

export const storeCryptoAddress = async (key: keys) => {

  const opts = optionsForKeychainAccess(KeychainServices.addr , false)
  const result = await Keychain.setGenericPassword('PublicAddress' , key.address)
  return typeof result ==='boolean' ? false : true


}

export const getpubAddress = async() => {

  const opts: Keychain.Options = {
    service: KeychainServices.addr,
  }

  const result = await Keychain.getGenericPassword(opts)
  if (!result) {
    return
  }

  return JSON.parse(result.password)
}


export const storeSeedPhrase = async(seedphr:seedphr) => {

  const opts = optionsForKeychainAccess(KeychainServices.seed , false)
  const result = await Keychain.setGenericPassword("SeedPhrase" , seedphr.mnemonic.toString())
  return typeof result === 'boolean' ? false : true

}

export const getSeedPhrase = async() => {

  const opts: Keychain.Options = {
    service: KeychainServices.seed,
  }
  const result = await Keychain.getGenericPassword(opts)
  if (!result) {
    return
  }

  return JSON.parse(result.password) 


}


export const wipeWalletKey = async (useBiometrics: boolean) => {
  const opts = optionsForKeychainAccess(KeychainServices.Key, useBiometrics)
  await Keychain.resetGenericPassword(opts)
}

export const storeWalletKey = async (secret: WalletKey, useBiometrics = false): Promise<boolean> => {
  const opts = optionsForKeychainAccess(KeychainServices.Key, useBiometrics)
  const secretAsString = JSON.stringify(secret)
  await wipeWalletKey(useBiometrics)
  const result = await Keychain.setGenericPassword(keyFauxUserName, secretAsString, opts)
  return typeof result === 'boolean' ? false : true
}

export const storeWalletSalt = async (secret: WalletSalt): Promise<boolean> => {
  const opts = optionsForKeychainAccess(KeychainServices.Salt, false)
  const secretAsString = JSON.stringify(secret)
  const result = await Keychain.setGenericPassword(saltFauxUserName, secretAsString, opts)
  return typeof result === 'boolean' ? false : true
}

export const storeWalletSecret = async (secret: WalletSecret, useBiometrics = false): Promise<boolean> => {
  let keyResult = false
  if (secret.key) {
    keyResult = await storeWalletKey({ key: secret.key }, useBiometrics)
  }

  const saltResult = await storeWalletSalt({ id: secret.id, salt: secret.salt })

  return keyResult && saltResult
}

export const loadWalletSalt = async (): Promise<WalletSalt | undefined> => {
  const opts: Keychain.Options = {
    service: KeychainServices.Salt,
  }
  const result = await Keychain.getGenericPassword(opts)
  if (!result) {
    return
  }

  return JSON.parse(result.password) as WalletSalt
}

export const loadWalletKey = async (title?: string, description?: string): Promise<WalletKey | undefined> => {
  let opts: Keychain.Options = {
    service: KeychainServices.Key,
  }

  if (title && description) {
    opts = {
      ...opts,
      authenticationPrompt: {
        title,
        description,
      },
    }
  }
  const result = await Keychain.getGenericPassword(opts)

  if (!result) {
    return
  }

  return JSON.parse(result.password) as WalletKey
}

export const loadWalletSecret = async (title?: string, description?: string): Promise<WalletSecret | undefined> => {
  const salt = await loadWalletSalt()
  const key = await loadWalletKey(title, description)

  return { ...salt, ...key } as WalletSecret
}

export const isBiometricsActive = async (): Promise<boolean> => {
  const result = await getSupportedBiometryType()

  return result !== null ? true : false
}
