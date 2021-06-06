import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  Switch,
} from 'react-native';
import WifiService from '../wifi/WifiService';
import * as constants from '../util/constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export class WifiSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switchValue: false,
      wifissid: '',
      wifipassword: '',
    };

    this.wifiStatus();
  }

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
    const password = this.state.wifipassword;
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

  async refreshStatus() {
    const status = await WifiService.getWifiStatus();
    console.log(status);
    this.setState({switchValue: status});
  }

  componentDidUpdate(nextProps) {
    const {statusWifi} = this.props;
    if (nextProps.statusWifi !== statusWifi) {
      if (!statusWifi) {
        this.setState({switchValue: false});
        this.props.onTurnOffWifi(true);
      }
    }
  }

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
          <View style={{marginTop: 20, marginBottom: 10}}>
            <Button
              color={constants.GREEN_COLOR}
              title="Refresh"
              onPress={() => this.refreshStatus()}
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
            placeholder="password"
            autoCapitalize="none"
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
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  item: {
    padding: 10,
    fontSize: 15,
    height: 44,
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
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
  },
  switchStyle: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
  inputLogin: {
    height: 44,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default WifiSection;
