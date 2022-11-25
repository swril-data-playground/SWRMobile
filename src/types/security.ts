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
    mnemonic : string,
    seed : string
  }

  export interface keys {
    publick : string
    address : string
    privatek : string
  }

  export interface prikey {
    privatek : string
  }