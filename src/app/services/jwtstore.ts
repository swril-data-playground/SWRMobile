import AsyncStorage from '@react-native-async-storage/async-storage'

const deviceStorage = {
    async saveItem(key:string, value:string) {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      }
};

export default deviceStorage;