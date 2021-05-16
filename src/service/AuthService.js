import {Alert} from 'react-native';
import HeaderUtil from '../util/HeaderUtil';

const API_URL_LOGIN = 'http://10.123.45.1:3333/api/1_0/login';
const API_URL_LOGOUT = 'http://10.123.45.1:3333/api/1_0/logout';
const base64 = require('base-64');

class AuthService {

  async login(username, password) {
    var headers = new Headers();
    headers.set(
      'Authorization',
      'Basic ' + base64.encode(`${username}:${password}`),
    );
    headers.set('Content-Type', 'application/json');
    console.log('headers login');
    console.log(headers);

    return fetch(API_URL_LOGIN, {
      method: 'POST',
      headers: headers,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.token) {
          //cambiar !
          const token = {
            token: response.token,
          };
          HeaderUtil.storeData(token);
          return true;
        } else {
          Alert.alert(response.error.msg);
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async logout() {
    const athorozationHeader = await HeaderUtil.authHeader();

    var headers = new Headers();
    headers.set('Authorization', athorozationHeader.Authorization);
    headers.set('Content-Type', 'application/json');
    console.log('headers LOGOUT');
    console.log(headers);

    return fetch(API_URL_LOGOUT, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.text) {
          HeaderUtil.removeValue();
          Alert.alert(response.text);
          return response.text == 'Logout Successful'? false: true;
        } else {
          Alert.alert(response.error.msg);
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new AuthService();
