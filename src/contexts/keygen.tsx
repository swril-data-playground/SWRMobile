import axios from 'axios'
import {
    storeKey,
    storeCryptoAddress,
    storeSeedPhrase,
    getPubKey
} from '../services/keychain'
import { seedphr , keys } from 'types/security';
import { createContext } from 'react';

const baseUrl = "http://44.212.9.85:9999/api/"

let seedphrase : string;
let privatekey : string;
let publickey  : string;
let publicaddress : string;
/*
export interface KeyGenContext{

    setSeedphrase : () => Promise<boolean>
    getPrikey : (seedphrase : string) => Promise<boolean>
    setPriPub : (privatekey : string) => Promise<boolean>
    setpublicAdd : (publickey: string ) => Promise<boolean>
}

export const KeyGenContext = createContext<KeyGenContext>(null as unknown as KeyGenContext)
*/

export const setSeedphrase = async ()  => {
  console.log("in setseedphrase");
    await axios({
        method: 'get',
        url: `${baseUrl}seedphrase`,
        params:{}
      }).then((response) => {
        //console.log(response.data);
        seedphrase = String(response.data['seedPhrase']);
        //console.log(seedphrase);
      });

    setTimeout(() => {storeSeedPhrase(seedphrase)} , 5);

    return seedphrase

}

export const getPrikey = async(seedphrase:string) => {
    console.log("ingetPriKey");
    await axios({
        method: 'get',
        url: `${baseUrl}privatekey`,
        params:{seed : seedphrase }
      }).then((response) => {
        //console.log(response.data);
        privatekey = String(response.data['privateKey']);
        //console.log(privatekey);
      });

      return privatekey;
}


export const setPriPub = async(seedphrase:string) => 
{
  console.log("in setPriPub");

  let result;
  privatekey = await getPrikey(seedphrase);

   await axios({
        method: 'get',
        url: `${baseUrl}publickey`,
        params:{prk : privatekey }
      }).then((response) => {
        //console.log(response.data);
        publickey = String(response.data['publicKey']);
        console.log(publickey);
      });
      
      let key = {
        publick : publickey,
        address :'a',
        privatek: privatekey}
      
      console.log(key);
        
      result = await storeKey(key)

      console.log(result);
        
      return result;

}

export const setpublicAdd = async() => {
    console.log("in setpubadd");
    let pbk = await getPubKey();
    if(typeof(pbk) == "string"){
      publickey = pbk;
      console.log("pbk");
    }
    await axios({
        method: 'get',
        url: `${baseUrl}publicaddress`,
        params:{pbk : publickey }
        }).then((response) => {
            console.log(response.data);
            publicaddress = String(response.data['publicAddress']) ;
            console.log(publicaddress);
    });

      storeCryptoAddress({ publick : 'publickey',
      address :publicaddress,
      privatek: 'prik'});

    return publicaddress;


}