export interface WalletSecret {
    id: string
    key?: string
    salt: string
  }
  
  export enum AuthLevel {
    BiometricsFallbackPin = 'BiometricsFallbackPin',
    BiometricsAndPin = 'BiometricsAndPin',
    BiometricsOnly = 'BiometricsOnly',
  }

  export interface seedphr {
    mnemonic : Buffer,
    seed : string
  }

  export interface keys {
    publick : number
    address: number
    privatek : number
  }

  export interface prikey {
    privatek : number
  }