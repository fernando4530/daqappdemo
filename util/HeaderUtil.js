import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

class HeaderUtil {
  async authHeader() {
    const user = JSON.parse(await AsyncStorage.getItem('token'));
    console.log('user:');
    console.log(user);
    if (user && user.token) {
      return {Authorization: 'Bearer ' + user.token};
    } else {
      return {};
    }
  }

  getData = async () => {
    console.log('CONSULTANDO..');
    try {
      const jsonValue = await AsyncStorage.getItem('token');
      return jsonValue != null
        ? Alert.alert(JSON.stringify(jsonValue))
        : Alert.alert('NO HAY TOKEN');
    } catch (e) {
      console.log(e);
      Alert.alert(e);
    }
  };

  storeData = async (value) => {
    try {
      console.log('guardando token');
      console.log(value);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('token', jsonValue);
      console.log('guardado.');
      Alert.alert('LOGIN CORRECTO');
    } catch (e) {
      console.log(e);
    }
  };

  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('AsyncStorage token eliminado');
    } catch (e) {
      console.log(e);
    }
    console.log('Done.');
  };
}

export default new HeaderUtil();
