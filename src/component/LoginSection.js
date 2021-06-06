import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TextInput} from 'react-native';
import * as constants from '../util/constants';
import AuthService from '../service/AuthService';
import WifiService from '../wifi/WifiService';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: constants.DAQ_LOGIN_USERNAME,
      password: constants.DAQ_LOGIN_PASSWORD,
    };
  }

  async onLogout() {
    const result = await AuthService.logout();
    this.handleLangChange(result);
  }

  async onLogin() {
    const {username, password} = this.state;
    const result = await AuthService.login(username, password);
    this.handleLangChange(result);
  }

  async checkIsEnabledWifi() {
    const result = await WifiService.checkIsEnabledWifi();
    result ? this.props.onTurnOffWifi(result) : this.props.onTurnOffWifi(false);
  }

  handleLangChange = (result) => {
    result
      ? this.props.handleColorSetStatus(constants.BLUE_COLOR)
      : this.props.handleColorSetStatus(constants.GRAY_COLOR);
  };

  render() {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <View
            style={{
              marginLeft: 25,
              flex: 1,
              height: 1,
              backgroundColor: 'black',
            }}
          />
          <View>
            <Text style={styles.separatorTitle}>LOGIN</Text>
          </View>
          <View
            style={{
              marginRight: 25,
              flex: 1,
              height: 1,
              backgroundColor: 'black',
            }}
          />
        </View>

        <View style={styles.containerLogin}>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({username})}
            placeholder={'username'}
            style={styles.inputLogin}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            placeholder={'password'}
            style={styles.inputLogin}
          />
          <View style={styles.buttonLoginContainer}>
            <Button
              title={'Login'}
              color={constants.BLUE_COLOR}
              onPress={this.onLogin.bind(this)}
            />
          </View>
          <View style={styles.buttonLoginContainer}>
            <Button
              title={'Logout'}
              color={constants.RED_COLOR}
              onPress={this.onLogout.bind(this)}
            />
          </View>
          <View style={styles.buttonLoginContainer}>
            <Button
              title={'Turn Off WIFI'}
              color={constants.GREEN_COLOR}
              onPress={this.checkIsEnabledWifi.bind(this)}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  separatorTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: constants.BLACK_COLOR,
  },
  containerLogin: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
    margin: 25,
  },
  inputLogin: {
    height: 44,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonLoginContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
  },
});

export default Login;
