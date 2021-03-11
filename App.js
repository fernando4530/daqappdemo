/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import wifi from 'react-native-android-wifi';
import WifiManager from "react-native-wifi-reborn";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  PermissionsAndroid,
  FlatList,
  Modal,
  Pressable,
  TextInput
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';


const requestPermisionWifi = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Wifi networks',
        'message': 'We need your permission in order to find wifi networks'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Thank you for your permission! :)");
    } else {
      console.log("You will not able to retrieve wifi available networks list");
    }
  } catch (err) {
    console.warn(err)
  }
}


var ssidValue = "vacio";




class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [{
        lavel: "asd",
        capabilities: "asd",
        timestamp: "asd",
        frequency: "asd",
        BSSID: "asd",
        SSID: "asd"
      }
      ],
      ssidSelected: "any",
      password: "any"

    };
  }



  tick() {
    this.setState({
      items: ["1", "2", "3"]
    });
  }


  getWifiListBorn() {


    const lista = WifiManager.loadWifiList().then(
      wifilist => {
        console.log("lista wifi:");
        console.log(wifilist);
        this.setState({
          items: wifilist
        });
      },
      () => {
        console.log("Cannot get current SSID!");
      }
    );

  }

  openModal(item) {
    ssidValue = item.key;
    console.log(ssidValue);
    this.setState({
      ssidSelected: item.SSID
    });
  }

  onChangeText(text) {
    console.log(text);
    this.setState({
      password: text
    });
    console.log(this.state.password);

  }


  connectWifiReborn() {
    // const ssid = "fer-wifi";
    // const password = "abretesesamo";
    const ssid = this.state.ssidSelected;
    const password = this.state.password;
    const isWep = false;
    console.log("conectando a: ");
    console.log(ssid);
    console.log(password);
    WifiManager.connectToProtectedSSID(ssid, password, isWep).then(
      () => {
        console.log("Connected successfully!");
      },
      () => {
        console.log("Connection failed!");
      }
    );
  }






  getMoviesFromApiAsync() {
    return fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        // Works on both Android and iOS
        Alert.alert(
          'Alert Title',
          'My Alert Msg: \n' + JSON.stringify(json),
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
      })
  }


  render() {



    /* WIFI REBORN */



    function getCurrentSSIDBorn() {
      WifiManager.getCurrentWifiSSID().then(
        ssid => {
          console.log("Your current connected wifi SSID is " + ssid);
        },
        () => {
          console.log("Cannot get current SSID!");
        }
      );
    }



    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Funciones WIFI</Text>
                <Text style={styles.sectionDescription}>
                  A continiacion se disponen las funcionalidades habilitadas para trabajar con Wifi.
              </Text>

                <Button
                  color="red"
                  title="Get Current SSID"
                  onPress={getCurrentSSIDBorn}
                />
                <Button
                  color="red"
                  title="Load Wifi List"
                  onPress={() => this.getWifiListBorn()}
                />
                <Button
                  color="red"
                  title="NE BOTON"
                  onPress={() => this.tick()}
                />


                <Text style={styles.footer}>{this.state.date}</Text>


                <FlatList
                  data={this.state.items}
                  renderItem={({ item }) => <Text onPress={() => this.openModal(item)} style={styles.item}>{item.SSID}</Text>}
                />


              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Conectar</Text>
                <Text style={styles.sectionDescription}>
                  {this.state.ssidSelected}
                </Text>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={text => this.onChangeText(text)}
                  value={this.state.password}
                />
                <Button
                  color="red"
                  title="Connect Wifi"
                  onPress={() => this.connectWifiReborn()}
                />
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Test API</Text>
                <Button
                  color="blue"
                  title="TEST API ENDPOINY"
                  onPress={() => this.getMoviesFromApiAsync()}
                />

              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },

  // listview
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  //modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});



export default App;