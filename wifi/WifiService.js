import WifiManager from 'react-native-wifi-reborn';
import SystemSetting from 'react-native-system-setting';
import * as constants from '../util/constants';

import {Alert, PermissionsAndroid, Platform} from 'react-native';

class WifiService {
  async requestPermisionWifi() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Wifi networks',
          message: 'We need your permission in order to find wifi networks',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Thank you for your permission! :)');
      } else {
        console.log(
          'You will not able to retrieve wifi available networks list',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }

  getWifiList() {
    this.checkLocation();
    this.requestPermisionWifi();
    return WifiManager.loadWifiList();
  }

  connectWifi(ssid, password) {
    WifiManager.disconnect();
    this.checkLocation();
    const isWep = false;
    console.log('conectando a: ');
    console.log(ssid);
    console.log(password);
    WifiManager.connectToProtectedSSID(ssid, password, isWep).then(
      () => {
        console.log('Connected successfully!');
      },
      (error) => {
        console.log(error);
        Alert.alert(
          'Conexión',
          'No se pudo realizar la conexión',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      },
    );
  }

  autoConnectWifi() {
    WifiManager.disconnect();
    this.checkLocation();
    const ssid = constants.AUTO_CONNECT_DAQ_SSID;
    const password = constants.AUTO_CONNECT_DAQ_PASSWORD;
    const isWep = false;
    WifiManager.connectToProtectedSSID(ssid, password, isWep).then(
      () => {
        console.log('Connected successfully!');
      },
      () => {
        console.log('Connection failed!');
        Alert.alert(
          'Conexión',
          'No se pudo realizar la conexión',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      },
    );
  }

  getCurrentSSID() {
    WifiManager.getCurrentWifiSSID().then(
      (ssid) => {
        console.log('Your current connected wifi SSID is ' + ssid);
        Alert.alert(
          'WIFI SSID Conectado',
          'Usted está actualmente conectado a la red Wifi: \n' + ssid,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: true},
        );
      },
      () => {
        console.log('Cannot get current SSID!');
        Alert.alert(
          'WIFI SSID Conectado',
          'No es posible obtener el nombre de la red',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: true},
        );
      },
    );
  }

  async switchWifiDevice(value) {
    const ApiVersion = Platform.constants['Version'];
    console.log('enablewifi');
    if (ApiVersion >= 29) {
      console.log('API > 29');
      return this.switchOnStatus();
    } else {
      console.log('API < 29');
      if (value) {
        WifiManager.setEnabled(value);
        Alert.alert('Wifi Device', 'TURN ON', [], {cancelable: true});
      } else {
        WifiManager.setEnabled(value);
        Alert.alert('Wifi Device', 'TURN OFF', [], {cancelable: true});
      }
      this.setState({switchValue: value});
    }
  }

  async getWifiStatus() {
    const enabled = await WifiManager.isEnabled();
    return enabled;
  }

  async switchOnStatus() {
    return new Promise((resolve, reject) => {
      SystemSetting.switchWifi(async () => {
        const enabled = await this.getWifiStatus();
        resolve(enabled);
      });
    });
  }

  checkLocation() {
    SystemSetting.isLocationEnabled().then((enable) => {
      const state = enable ? true : false;
      console.log('Current location is ' + state);
      if (!state) {
        SystemSetting.switchLocation(() => {
          console.log('switch location successfully');
        });
      }
    });
  }

  async checkIsEnabledWifi() {
    const result = await this.getWifiStatus();
    result
      ? this.switchWifiDevice()
      : Alert.alert('WIFI: Ya se encuentra deshabilitado');
  }
}

export default new WifiService();
