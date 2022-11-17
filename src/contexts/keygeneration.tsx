const ethers = require('ethers') // Import the ethers.js library, a complete Ethereum wallet implementation and utilities for JavaScript (and TypeScript)
import bip39 from '@metamask/bip39'
var HDKey = require('/home/narukirito/SWRMobileAries/node_modules/hdkey')
const ethUtil = require('ethereumjs-util');
import {seedphr , keys , prikey} from '/home/narukirito/SWRMobileAries/src/types/security'


export const createseedphrase = async() : Promise<seedphr> => {
    const mnemonic = bip39.generateMnemonic();
    const se = bip39.mnemonicToSeedSync(mnemonic).toString('hex')

    const seed : seedphr = {
        mnemonic:mnemonic ,
        seed : se
    }

    return seed
}

export const createpripubkey = async(mnemonic : Buffer) : Promise<keys> => {
/*
can be used for recovery as well
//let mnemonic = seedPhrase; // Set the wallet mnemonic
let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic); // Generates a BIP-039 + BIP-044 wallet from mnemonic deriving path (default = "m/44'/60'/0'/0/0") using the wordlist
return mnemonicWallet.privateKey; // Output the private key
*/
const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex');
const root = HDKey.fromMasterSeed(seed);
const masterPrivateKey = root.privateKey.toString('hex');
console.log(masterPrivateKey);

const addrNode = root.derive("m/44'/60'/0'/0/0"); //need to change the number values
const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
const addr = ethUtil.publicToAddress(pubKey).toString('hex');
console.log("0x" + addr);

const allkey : keys = {
    publick : pubKey ,
    address: addr ,
    privatek : masterPrivateKey

}
 return allkey

}
/*
export const createaddress = async(prik : number) => {


}

*/