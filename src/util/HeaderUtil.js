import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HeaderUtil {
  async authHeader() {
    const user = JSON.parse(await AsyncStorage.getItem('token'));
    console.log(user);
    if (user && user.token) {
      return {Authorization: 'Bearer ' + user.token};
    } else {
      return {};
    }
  }

  getData = async () => {
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
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('token', jsonValue);
      console.log('token guardado.');
      Alert.alert('LOGIN CORRECTO');
    } catch (e) {
      console.log(e);
    }
  };

  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('token eliminado.');
    } catch (e) {
      console.log(e);
    }
    console.log('Done.');
  };
}

export default new HeaderUtil();
