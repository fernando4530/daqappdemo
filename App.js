/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import WifiManager from "react-native-wifi-reborn";
import SystemSetting from 'react-native-system-setting'

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
  TextInput,
  ImageBackground,
  Platform,
  Switch,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [{
        lavel: "",
        capabilities: "",
        timestamp: "",
        frequency: "",
        BSSID: "",
        SSID: ""
      }
      ],
      ssidSelected: "",
      password: "",
      switchValue: false,
    };
    this.getWifiStatus()
  }

  async requestPermisionWifi() {
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

  getWifiListBorn() {
    this.requestPermisionWifi();
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

  selectSSID(item) {
    this.setState({
      ssidSelected: item.SSID
    });
  }

  onChangeText(text) {
    console.log(text);
    this.setState({
      password: text
    });
  }

  connectWifiReborn() {
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
        Alert.alert(
          'Conexión',
          'No se pudo realizar la conexión',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
      }
    );
  }

  autoConnectWifiReborn() {
    const ssid = 'AP-DAQ01';
    const password = 'bollanddaq01';
    const isWep = false;
    console.log("auto conectando a: ");
    console.log(ssid);
    console.log(password);
    WifiManager.connectToProtectedSSID(ssid, password, isWep).then(
      () => {
        console.log("Connected successfully!");
      },
      () => {
        console.log("Connection failed!");
        Alert.alert(
          'Conexión',
          'No se pudo realizar la conexión',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
      }
    );
  }

  getCurrentSSIDBorn() {
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        console.log("Your current connected wifi SSID is " + ssid);
        Alert.alert(
          'WIFI SSID Conectado',
          'Usted está actualmente conectado a la red Wifi: \n' + ssid,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: true }
        );
      },
      () => {
        console.log("Cannot get current SSID!");
        Alert.alert(
          'WIFI SSID Conectado',
          'No es posible obtener el nombre de la red',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: true }
        );
      }
    )
  }

  getApiTicket() {
    const url = 'http://10.123.45.1:3333/api/1_0/ticket';
    return fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    }, 2000)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const atributos = datadaq;
        console.log(atributos);
        const json1 = json[0];
        Alert.alert(
          'API DAQ',
          JSON.stringify(json.data.tipo) + ' ' + JSON.stringify(json.data.id) +
          '\n Bateria: ' + JSON.stringify(json.data.atributos.bateria) +
          '\n ID DAQ: ' + JSON.stringify(json.data.atributos.id_daq) +
          '\n ID Ticket: ' + JSON.stringify(json.data.atributos.id_ticket) +
          '\n IRE: ' + JSON.stringify(json.data.atributos.ire) +
          '\n Latitud: ' + JSON.stringify(json.data.atributos.latitud) +
          '\n Longitud: ' + JSON.stringify(json.data.atributos.longitud) +
          '\n Pozo: ' + JSON.stringify(json.data.atributos.pozo) +
          '\n Presion: ' + JSON.stringify(json.data.atributos.presion) +
          '\n Producto: ' + JSON.stringify(json.data.atributos.producto) +
          '\n Temperatura: ' + JSON.stringify(json.data.atributos.temperatura) +
          '\n Timestamp: ' + JSON.stringify(json.data.atributos.timestamp) +
          '\n Verificacion: ' + JSON.stringify(json.data.atributos.verificacion) +
          '\n Volumen Agregado: ' + JSON.stringify(json.data.atributos.volumen_agregado)
          ,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: true }
        );
      })
      .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        const mje_error = error;
        Alert.alert(
          'API DAQ ERROR',
          'Error: \n' + mje_error,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: true }
        );
      });
  }

  getApiPosicion() {
    const url = 'http://10.123.45.1:3333/api/1_0/posicion';
    return fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    }, 2000)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        Alert.alert(
          'API DAQ',
          JSON.stringify(json.data.tipo) + ' ' + JSON.stringify(json.data.id) +
          '\n Latitud: ' + JSON.stringify(json.data.atributos.latitud) +
          '\n Longitud: ' + JSON.stringify(json.data.atributos.longitud) +
          '\n Curso: ' + JSON.stringify(json.data.atributos.curso) +
          '\n Dato Valido: ' + JSON.stringify(json.data.atributos.dato_valido) +
          '\n Fecha: ' + JSON.stringify(json.data.atributos.fecha) +
          '\n Posición Valida: ' + JSON.stringify(json.data.atributos.posicion_valida) +
          '\n Tiempo: ' + JSON.stringify(json.data.atributos.tiempo) +
          '\n Velocidad: ' + JSON.stringify(json.data.atributos.velocidad)
          ,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: true }
        );
      })
      .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        const mje_error = error;
        Alert.alert(
          'API DAQ ERROR',
          'Error: \n' + mje_error,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: true }
        );
      });
  }

  getApiConfiguracion() {
    const url = 'http://10.123.45.1:3333/api/1_0/configuracion';
    return fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    }, 2000)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const atributos = datadaq;
        console.log(atributos);
        const json1 = json[0];
        Alert.alert(
          'API DAQ',
          JSON.stringify(json.data.tipo) + ' ' + JSON.stringify(json.data.id) +
          '\n ID Caudalimetro 1: ' + JSON.stringify(json.data.atributos.id_caudalimetro_1) +
          '\n ID Caudalimetro 2: ' + JSON.stringify(json.data.atributos.id_caudalimetro_2) +
          '\n ID DAQ: ' + JSON.stringify(json.data.atributos.id_daq) +
          '\n ID Vehiculo: ' + JSON.stringify(json.data.atributos.id_vehiculo) +
          '\n Nombre Caudalimetro 1: ' + JSON.stringify(json.data.atributos.nombre_caudalimetro_1) +
          '\n Nombre Caudalimetro 2: ' + JSON.stringify(json.data.atributos.nombre_caudalimetro_2) +
          '\n Nombre Vehiculo: ' + JSON.stringify(json.data.atributos.nombre_vehiculo) +
          '\n Revisión Soft: ' + JSON.stringify(json.data.atributos.revision_soft) +
          '\n Timestamp Actualizado: ' + JSON.stringify(json.data.atributos.timestamp_actualizado) +
          '\n Timestamp Descargado: ' + JSON.stringify(json.data.atributos.timestamp_descargado) +
          '\n Verificacion: ' + JSON.stringify(json.data.atributos.verificacion)
          ,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: true }
        );
      })
      .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        const mje_error = error;
        Alert.alert(
          'API DAQ ERROR',
          'Error: \n' + mje_error,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: true }
        );
      });
  }

  getApiConfiguracionPatch() {
    const url = 'http://10.123.45.1:3333/api/1_0/configuracion';
    return fetch(url, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          "data": {
            "id": "1",
            "tipo": "configuracion",
            "atributos": {
              "id_caudalimetro_1": "11",
              "id_caudalimetro_2": "22",
              "id_daq": "33",
              "id_vehiculo": "44",
              "nombre_caudalimetro_1": "cau11",
              "nombre_caudalimetro_2": "cau22",
              "nombre_vehiculo": "veh11",
              "revision_soft": "77",
              "timestamp_actualizado": "null",
              "timestamp_descargado": "2021/03/12-01:33:00",
              "verificacion": "ABCDEF1234"
            }
          }
        }
      )
    }, 2000)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const atributos = datadaq;
        console.log(atributos);
        const json1 = json[0];
        Alert.alert(
          'API DAQ',
          JSON.stringify(json.data.tipo) + ' ' + JSON.stringify(json.data.id) +
          '\n ID Caudalimetro 1: ' + JSON.stringify(json.data.atributos.id_caudalimetro_1) +
          '\n ID Caudalimetro 2: ' + JSON.stringify(json.data.atributos.id_caudalimetro_2) +
          '\n ID DAQ: ' + JSON.stringify(json.data.atributos.id_daq) +
          '\n ID Vehiculo: ' + JSON.stringify(json.data.atributos.id_vehiculo) +
          '\n Nombre Caudalimetro 1: ' + JSON.stringify(json.data.atributos.nombre_caudalimetro_1) +
          '\n Nombre Caudalimetro 2: ' + JSON.stringify(json.data.atributos.nombre_caudalimetro_2) +
          '\n Nombre Vehiculo: ' + JSON.stringify(json.data.atributos.nombre_vehiculo) +
          '\n Revisión Soft: ' + JSON.stringify(json.data.atributos.revision_soft) +
          '\n Timestamp Actualizado: ' + JSON.stringify(json.data.atributos.timestamp_actualizado) +
          '\n Timestamp Actualizado: ' + JSON.stringify(json.data.atributos.timestamp_descargado) +
          '\n Verificacion: ' + JSON.stringify(json.data.atributos.verificacion)
          ,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: true }
        );
      })
      .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        const mje_error = error;
        Alert.alert(
          'API DAQ ERROR',
          'Error: \n' + mje_error,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: true }
        );
      });
  }

  switchWifiDevice(value) {
    const ApiVersion = Platform.constants['Version'];
    console.log("enablewifi");
    if (ApiVersion >= 29) {
      console.log("API > 29")
      this.switchOnStatus();
    } else {
      console.log("API < 29")
      if (value) {
        WifiManager.setEnabled(value);
        Alert.alert(
          'Wifi Device',
          'TURN ON',
          [],
          { cancelable: true }
        );
      } else {
        WifiManager.setEnabled(value);
        Alert.alert(
          'Wifi Device',
          'TURN OFF',
          [],
          { cancelable: true }
        );
      };
      this.setState({ switchValue: value });
    }
  }

  switchOnStatus() {
    SystemSetting.isWifiEnabled().then((enable) => {
      const state = enable ? true : false;
      console.log('Current wifi is ' + state);
      SystemSetting.switchWifi(() => {
        console.log('switch wifi successfully:');
        this.getWifiStatus();
      });
    });
  }

  toggleSwitch = (value) => {
    console.log('Switch 1 is: ' + value);
    this.switchWifiDevice(value);
  }

  async getWifiStatus() {
    const enabled = await WifiManager.isEnabled();
    console.log("estado wifi:" + enabled);
    this.setState({ switchValue: enabled })
    return enabled;
  }

  render() {

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <ImageBackground
              accessibilityRole={'image'}
              source={require('./assets/hardware.jpg')}
              style={styles.background}
              imageStyle={styles.logo}>
              <Text style={styles.text}>DAQ APP DEMO</Text>
            </ImageBackground>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                <View style={{ marginLeft: 25, flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                  <Text style={styles.separatorTitle}>WIFI FUNCTIONS</Text>
                </View>
                <View style={{ marginRight: 25, flex: 1, height: 1, backgroundColor: 'black' }} />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>WIFI Status</Text>
                <View style={styles.switchStyle}>
                  <Switch
                    trackColor={{ false: "#767577", true: "#b2dbb8" }}
                    thumbColor={this.state.switchValue ? "#3bff5a" : "#f4f3f4"}
                    onValueChange={this.toggleSwitch}
                    value={this.state.switchValue} />
                </View>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>List Networks</Text>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <Button
                    color="#dc3545"
                    title="Scan"
                    onPress={() => this.getWifiListBorn()}
                  />
                </View>
                <FlatList
                  data={this.state.items}
                  renderItem={({ item, index }) => <Text onPress={() => this.selectSSID(item)} style={styles.item}>{item.SSID}</Text>}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Connect To</Text>
                <Text style={styles.sectionDescription}>
                  SSID: {this.state.ssidSelected}
                </Text>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={text => this.onChangeText(text)}
                  value={this.state.password}
                  placeholder="Password"
                />
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <Button
                    color="#dc3545"
                    title="Connect"
                    onPress={() => this.connectWifiReborn()}
                  />
                </View>
                <Text style={styles.sectionTitle}>Auto Connect</Text>
                <Text style={styles.sectionDescription}>
                  SSID: AP-DAQ01
                </Text>
                <Text style={styles.sectionDescription}>
                  PASS: bollanddaq01
                </Text>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <Button
                    color="#dc3545"
                    title="Connect"
                    onPress={() => this.autoConnectWifiReborn()}
                  />
                </View>
                <Text style={styles.sectionTitle}>Current Connection</Text>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <Button
                    color="#dc3545"
                    title="Check"
                    onPress={() => this.getCurrentSSIDBorn()}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                <View style={{ marginLeft: 25, flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                  <Text style={styles.separatorTitle}>API TEST</Text>
                </View>
                <View style={{ marginRight: 25, flex: 1, height: 1, backgroundColor: 'black' }} />
              </View>
              <View style={styles.sectionContainer}>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <Button
                    style={{ marginTop: 10, marginBottom: 10 }}
                    color="#007bff"
                    title="GET: Ticket"
                    onPress={() => this.getApiTicket()}
                  />
                </View>
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  <Button
                    style={{ marginTop: 100, marginBottom: 10 }}
                    color="#007bff"
                    title="GET: Posicion"
                    onPress={() => this.getApiPosicion()}
                  />
                </View>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <Button
                    color="#007bff"
                    title="GET: Configuracion"
                    onPress={() => this.getApiConfiguracion()}
                  />
                </View>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <Button
                    color="#17a2b8"
                    title="PATCH: Configuracion"
                    onPress={() => this.getApiConfiguracionPatch()}
                  />
                </View>

                <View style={{ marginTop: 50 }}>
                </View>

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
  },
  //header local
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
  },
  logo: {
    opacity: 0.3,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
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
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
  }
});



export default App;
