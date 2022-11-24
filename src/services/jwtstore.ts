import * as SecureStore from 'expo-secure-store'
import { KeyNames } from 'src/constants';
export const tokenStorage = async(value:string) =>{
        try {
          await  SecureStore.setItemAsync(KeyNames.TokenStorage, value);
        } catch (error) {
          console.log('AsyncStorage Error: ' + error);
        }
      }

export default tokenStorage;