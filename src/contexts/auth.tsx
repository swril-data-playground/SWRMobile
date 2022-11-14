import { Agent, AgentConfig } from '@aries-framework/core'
import { SWRWallet } from '/home/narukirito/SWRMobileAries/src/wallet/SWRWallet'
import { agentDependencies } from '/home/narukirito/SWRMobileAries/src/storage'
import React, { createContext, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  secretForPIN,
  storeWalletSecret,
  loadWalletSecret,
  loadWalletSalt,
  isBiometricsActive,
  wipeWalletKey,
} from '/home/narukirito/SWRMobileAries/src/app/services/keychain'
import { WalletSecret } from '../types/security'
import { hashPIN } from '../utils/crypto'

export interface AuthContext {
  checkPIN: (pin: string) => Promise<boolean>
  getWalletCredentials: () => Promise<WalletSecret | undefined>
  removeSavedWalletSecret: () => void
  setPIN: (pin: string , walletId:string) => Promise<void>
  commitPIN: (useBiometry: boolean) => Promise<boolean>
  isBiometricsActive: () => Promise<boolean>
}

export const AuthContext = createContext<AuthContext>(null as unknown as AuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const [walletSecret, setWalletSecret] = useState<WalletSecret>()
  const { t } = useTranslation()

  const setPIN = async (pin: string , walletId: string , salt ?: string): Promise<void> => {
    const secret = await secretForPIN(pin , walletId , salt)//returns object with walledId and Pin
    await storeWalletSecret(secret)//stores walletId and pin
  }

  const getWalletCredentials = async (): Promise<WalletSecret | undefined> => {
    if (walletSecret) {
      return walletSecret
    }

    const secret = await loadWalletSecret(t('Biometry.UnlockPromptTitle'), t('Biometry.UnlockPromptDescription'))
    if (!secret) {
      return
    }
    setWalletSecret(secret)

    return secret
  }

  const commitPIN = async (useBiometry: boolean): Promise<boolean> => {
    const secret = await getWalletCredentials()
    if (!secret) {
      return false
    }
    if (useBiometry) {
      await storeWalletSecret(secret, useBiometry)
    } else {
      // erase wallet key if biometrics is disabled
      await wipeWalletKey(useBiometry)
    }
    return true
  }

  const checkPIN = async (pin: string): Promise<boolean> => {
    const secret = await loadWalletSalt()

    if (!secret || !secret.salt) {
      return false
    }

    const hash = await hashPIN(pin, secret.salt)

    try {
      await agentDependencies.indy.openWallet({ id: secret.id }, { key: hash })
      // need full secret in volatile memory in case user wants to fall back to using PIN
      const fullSecret = await secretForPIN(pin, secret.salt)
      setWalletSecret(fullSecret)
      return true
    } catch (e) {
      return false
    }
  }

  const removeSavedWalletSecret = () => {
    setWalletSecret(undefined)
  }

  return (
    <AuthContext.Provider
      value={{
        checkPIN,
        getWalletCredentials,
        removeSavedWalletSecret,
        commitPIN,
        setPIN,
        isBiometricsActive,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
