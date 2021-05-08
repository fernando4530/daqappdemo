/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import AuthService from './service/AuthService';
import APIService from './service/APIService';
import WifiService from './wifi/WifiService';
import * as constants from './util/constants';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  ImageBackground,
  Switch,
  LogBox,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          lavel: '',
          capabilities: '',
          timestamp: '',
          frequency: '',
          BSSID: '',
          SSID: '',
        },
      ],
      wifissid: '',
      wifipassword: '',
      switchValue: false,
      username: constants.DAQ_LOGIN_USERNAME,
      password: constants.DAQ_LOGIN_PASSWORD,
    };
    this.wifiStatus();
  }

  // WIFI
  async wifiStatus() {
    const result = await WifiService.getWifiStatus();
    this.setState({switchValue: result});
  }

  async getWifiList() {
    const listawifi = await WifiService.getWifiList();
    this.setState({
      items: listawifi,
    });
  }

  connectWifi() {
    const ssid = this.state.wifissid;
    const password = this.state.password;
    WifiService.connectWifi(ssid, password);
  }

  autoConnectWifi() {
    WifiService.autoConnectWifi();
  }

  getCurrentSSID() {
    WifiService.getCurrentSSID();
  }

  selectedSSID(item) {
    this.setState({
      wifissid: item.SSID,
    });
  }

  toggleSwitchWifi = async (value) => {
    WifiService.switchWifiDevice(value).then((result) => {
      this.setState({switchValue: result});
    });
  };

  // AUHTENTICATION
  async onLogout() {
    AuthService.logout();
  }

  async onLogin() {
    const {username, password} = this.state;
    console.log(`${username}`);
    console.log(`${password}`);
    AuthService.login(username, password);
  }

  // API
  getTicket() {
    APIService.getTicket();
  }

  getPosicion() {
    APIService.getPosicion();
  }

  getConfiguracion() {
    APIService.getConfiguracion();
  }

  setConfiguracion() {
    APIService.setConfiguracion();
  }

  render() {
    return (
      <ScrollView>
        <ImageBackground
          accessibilityRole={'image'}
          source={require('./assets/hardware.jpg')}
          style={styles.background}
          imageStyle={styles.logo}>
          <Text style={styles.text}>DAQ APP DEMO</Text>
          <Text style={styles.versionStyle}>
            {constants.DAQ_APP_DEMO_VERSION}
          </Text>
        </ImageBackground>
        <View style={styles.body}>
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
              placeholder={'Username'}
              style={styles.inputLogin}
            />
            <TextInput
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
              placeholder={'Password'}
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
          </View>

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
              <Text style={styles.separatorTitle}>WIFI FUNCTIONS</Text>
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
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>WIFI Status</Text>
            <View style={styles.switchStyle}>
              <Switch
                trackColor={{false: '#767577', true: '#b2dbb8'}}
                thumbColor={this.state.switchValue ? '#3bff5a' : '#f4f3f4'}
                onValueChange={this.toggleSwitchWifi}
                value={this.state.switchValue}
              />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>List Networks</Text>
            <View style={{marginBottom: 10}}>
              <Button
                color={constants.GREEN_COLOR}
                title="Scan"
                onPress={() => this.getWifiList()}
              />
            </View>

            <ScrollView style={styles.scrollView}>
              <SafeAreaView style={{flex: 1}}>
                <FlatList
                  scrollEnabled={false}
                  data={this.state.items}
                  renderItem={({item, index}) => (
                    <Text
                      onPress={() => this.selectedSSID(item)}
                      style={styles.item}>
                      {item.SSID}
                    </Text>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </SafeAreaView>
            </ScrollView>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Connect To</Text>
            <TextInput
              style={styles.inputLogin}
              onChangeText={(wifissid) => this.setState({wifissid})}
              value={this.state.wifissid}
              placeholder="SSID"
            />
            <TextInput
              style={styles.inputLogin}
              onChangeText={(wifipassword) => this.setState({wifipassword})}
              value={this.state.wifipassword}
              placeholder="Password"
            />
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Button
                color={constants.GREEN_COLOR}
                title="Connect"
                onPress={() => this.connectWifi()}
              />
            </View>
            <Text style={styles.sectionTitle}>Auto Connect</Text>
            <Text>SSID: AP-DAQ01</Text>
            <Text>Password: bollanddaq01</Text>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Button
                color={constants.GREEN_COLOR}
                title="Connect"
                onPress={() => this.autoConnectWifi()}
              />
            </View>
            <Text style={styles.sectionTitle}>Current Connection</Text>
            <View style={{marginBottom: 10}}>
              <Button
                color={constants.GREEN_COLOR}
                title="Check"
                onPress={() => this.getCurrentSSID()}
              />
            </View>
          </View>

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
              <Text style={styles.separatorTitle}>API TEST</Text>
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
          <View style={styles.sectionContainer}>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Button
                color={constants.BLUE_COLOR}
                title="Get Ticket"
                onPress={() => this.getTicket()}
              />
            </View>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Button
                color={constants.BLUE_COLOR}
                title="Get Posicion"
                onPress={() => this.getPosicion()}
              />
            </View>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Button
                color={constants.BLUE_COLOR}
                title="Get Configuracion"
                onPress={() => this.getConfiguracion()}
              />
            </View>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Button
                color={constants.BLUE_COLOR}
                title="Set Configuracion"
                onPress={() => this.setConfiguracion()}
              />
            </View>
            <View style={{marginTop: 50}}></View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 25,
    paddingHorizontal: 24,
  },
  separatorTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionTitle: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
  },
  logo: {
    opacity: 0.3,
    overflow: 'visible',
    resizeMode: 'cover',
    marginLeft: -128,
    marginBottom: -192,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
  switchStyle: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
  versionStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
  containerLogin: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
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

export default App;