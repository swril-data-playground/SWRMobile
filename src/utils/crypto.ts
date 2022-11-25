import * as Crypto from 'expo-crypto';


export const hashPIN = async (pin: string, salt: string): Promise<string> => {
  const result = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.MD5,pin + salt)
  const rawHash  = result

  return rawHash
}