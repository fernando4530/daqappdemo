/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
  Colors,
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

var datadaq = { "data": { "atributos": { "bateria": "LC-10", "id_daq": "1", "id_ticket": "24", "ire": "29", "latitud": 3250.4426, "longitud": 6852.3931, "pozo": "COL-NRO6", "presion": 43.21, "producto": "DP858-100%", "temperatura": 12.34, "timestamp": "2021/03/12-00:22:54", "verificacion": "5df9f63916ebf8528697b629022993e8", "volumen_agregado": 5.67 }, "id": "1", "tipo": "ticket" } }

const controller = new AbortController();
const signal = controller.signal;


class App extends React.Component {

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
      password: ""

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



  executeAxios() {
    console.log("excuteeee");
    const url = 'http://10.123.45.1:3333/api/1_0/ticket';
    axios.get(url)
      .then(res => {
        const persons = res.data;
        console.log(persons);
      })
  }



  abortFetching() {
    console.log('Now aborting');
    // Abort.
    controller.abort()
  }


  getApiTicket() {
    // const url='https://jsonplaceholder.typicode.com/users';
    const url = 'http://10.123.45.1:3333/api/1_0/ticket';
    return fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      signal: signal, // <------ This is our AbortSignal
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
      },
      signal: signal, // <------ This is our AbortSignal
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
      },
      signal: signal, // <------ This is our AbortSignal
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


  render() {

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
                  onPress={() => this.getCurrentSSIDBorn()}
                />
                <Button
                  color="red"
                  title="Load Wifi List"
                  onPress={() => this.getWifiListBorn()}
                />

                <FlatList
                  data={this.state.items}
                  renderItem={({ item }) => <Text onPress={() => this.openModal(item)} style={styles.item}>{item.SSID}</Text>}
                />


              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Conectar</Text>
                <Text style={styles.sectionDescription}>
                  SSID: {this.state.ssidSelected}
                </Text>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={text => this.onChangeText(text)}
                  value={this.state.password}
                  placeholder="Password"
                />
                <Button
                  color="red"
                  title="Connect Wifi"
                  onPress={() => this.connectWifiReborn()}
                />

                <Text style={styles.sectionTitle}>Conectar Automáticamente</Text>
                <Text style={styles.sectionDescription}>
                  SSID: AP-DAQ01
                </Text>
                <Text style={styles.sectionDescription}>
                  PASS: bollanddaq01
                </Text>
                <Button
                  color="red"
                  title="Auto Connect Wifi"
                  onPress={() => this.autoConnectWifiReborn()}
                />
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Test API</Text>
                <Button
                  color="blue"
                  title="API ENDPOINT: Ticket GET"
                  onPress={() => this.getApiTicket()}
                />
                <Button
                  color="blue"
                  title="API ENDPOINT: Posición GET"
                  onPress={() => this.getApiPosicion()}
                />
                <Button
                  color="blue"
                  title="API ENDPOINT: Configuración GET"
                  onPress={() => this.getApiConfiguracion()}
                />

                <Button
                  color="red"
                  title="API ENDPOINT: Configuración PATCH"
                  onPress={() => this.getApiConfiguracionPatch()}
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
