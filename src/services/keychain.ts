import { Platform } from 'react-native'
//import DeviceInfo from 'react-native-device-info'
import {getSupportedBiometryType } from 'react-native-keychain'
import * as SecureStore from 'expo-secure-store';
//import uuid from 'react-native-uuid'

import {KeychainServices , KeyNames} from '../constants'
import { WalletSecret } from 'src/types/security'
import { hashPIN } from 'src/utils/crypto'
import { keys } from 'src/types/security'
const keyFauxUserName = 'WalletFauxPINUserName'
const saltFauxUserName = 'WalletFauxSaltUserName'

export interface WalletSalt {
  id: string
  salt: string
}

export interface WalletKey {
  key: string
}
/*
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
*/
export const secretForPIN = async (walletId: string , pin: string, salt?: string): Promise<WalletSecret> => {
  const mySalt = salt??''
  console.log("inside secretforPin" + mySalt);
  const myKey = await hashPIN(pin, mySalt??'')
  console.log("inside secretforpin" + myKey)
  const secret: WalletSecret = {
    id: walletId,
    key: myKey.toString(),
    salt: mySalt,
  }

  return secret
}

export const storeKey = async (key:keys) => {
 
  //const opts = optionsForKeychainAccess(KeychainServices.Cry , false)
  console.log(key.privatek);
  let resultpri = await SecureStore.setItemAsync(KeyNames.PrivateKey , key.privatek);
  let resultpub = await SecureStore.setItemAsync(KeyNames.PublicKey , key.publick);
  //const result = await Keychain.setGenericPassword(key.publick.toString() , key.privatek.toString() , opts)
  //return typeof resultpri ==='boolean' ? false : true
  return true
}

export const getPriKey = async() => {
/*
  const opts: Keychain.Options = {
    service: KeychainServices.Cry,
  }


  const result = await Keychain.getGenericPassword(opts)
  if (!result) {
    return
  }
*/
  let priKey = await SecureStore.getItemAsync(KeyNames.PrivateKey);

  return priKey;

}

export const getPubKey = async() => {
/*
  const opts: Keychain.Options = {
    service: KeychainServices.Cry,
  }

  const result = await Keychain.getGenericPassword(opts)
  if (!result) {
    return
  }
*/

let pubKey = await SecureStore.getItemAsync(KeyNames.PublicKey)
  return pubKey;

}


export const storeCryptoAddress = async (key: keys) => {

  //const opts = optionsForKeychainAccess(KeychainServices.addr , false)
  const result = await SecureStore.setItemAsync(KeyNames.PublicAddress , key.address.toString() )
  return typeof result ==='boolean' ? false : true


}

export const getpubAddress = async() => {
/*
  const opts: Keychain.Options = {
    service: KeychainServices.addr,
  }

  const result = await Keychain.getGenericPassword(opts)
  if (!result) {
    return
  }
*/
  const result = await SecureStore.getItemAsync(KeyNames.PublicAddress);
  return result;
}


export const storeSeedPhrase = async(seedphr:string) => {

  //const opts = optionsForKeychainAccess(KeychainServices.seed , false)
  const result = await SecureStore.setItemAsync(KeyNames.SeedPhrase, seedphr.toString());
  //return typeof result === 'boolean' ? false : true
  return result;

}

export const getSeedPhrase = async() => {
  /*
  const opts: Keychain.Options = {
    service: KeychainServices.seed,
  }
  const result = await Keychain.getGenericPassword(opts)
  if (!result) {
    return
  }
*/
const result = await SecureStore.getItemAsync(KeyNames.SeedPhrase);
  
return result; 


}


export const wipeWalletKey = async (useBiometrics: boolean) => {
  //const opts = optionsForKeychainAccess(KeychainServices.Key, useBiometrics)
  await SecureStore.deleteItemAsync(keyFauxUserName)
}

export const storeWalletKey = async (secret: WalletKey, useBiometrics = false) => {
  //const opts = optionsForKeychainAccess(KeychainServices.Key, useBiometrics)
  const secretAsString = JSON.stringify(secret.key)
  await wipeWalletKey(useBiometrics)
  const result = await SecureStore.setItemAsync(keyFauxUserName, secretAsString)
  return result;
}

export const storeWalletSalt = async (secret: WalletSalt) => {
  //const opts = optionsForKeychainAccess(KeychainServices.Salt, false)
  const secretAsString = JSON.stringify(secret)
  const result = await SecureStore.setItemAsync(saltFauxUserName, secretAsString)
  //return typeof result === 'boolean' ? false : true
  return result;
}

export const storeWalletSecret = async (secret: WalletSecret, useBiometrics = false) => {
  let keyResult;
  if (secret.key) {
    console.log("insidestorewalletsecret" + secret.key);
    keyResult = await storeWalletKey({ key: secret.key }, useBiometrics)
  }

  const saltResult = await storeWalletSalt({ id: secret.id, salt: secret.salt })

  return true
}

export const loadWalletSalt = async () => {
  /*
  const opts: Keychain.Options = {
    service: KeychainServices.Salt,
  }
  const result = await Keychain.getGenericPassword(opts)
  if (!result) {
    return
  }
*/
  let result = await SecureStore.getItemAsync(saltFauxUserName)

  return result;
}

export const loadWalletKey = async (title?: string, description?: string) => {
/* 
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
  */
  const result = await SecureStore.getItemAsync(keyFauxUserName);
  console.log("resultinloadwalletkey" + result)
  
  if (!result) {
    return
  }

  return result;
}

export const loadWalletSecret = async (title?: string, description?: string): Promise<WalletSecret | undefined> => {
  const salt = await loadWalletSalt()
  const key = await loadWalletKey(title, description)

  return { salt, key } as WalletSecret
}

export const isBiometricsActive = async (): Promise<boolean> => {
  const result = await getSupportedBiometryType()

  return result !== null ? true : false
}
