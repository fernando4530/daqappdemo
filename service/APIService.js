import {Alert} from 'react-native';
import HeaderUtil from '../util/HeaderUtil';

const API_URL_TICKET = 'http://10.123.45.1:3333/api/1_0/ticket';
const API_URL_POSICION = 'http://10.123.45.1:3333/api/1_0/posicion';
const API_URL_CONFIGURATION = 'http://10.123.45.1:3333/api/1_0/configuracion';
const API_URL_RECORRIDOS =
  'http://10.123.45.1:3333/api/1_0/recorridos/clave?id_empresa=101&id_sucursal=202&id_base=303&punto_origen=404&nro_ire=505&origen=Sistema';

class APIService {
  async getTicket() {
    const athorozationHeader = await HeaderUtil.authHeader();
    var headers = new Headers();
    headers.set('Authorization', athorozationHeader.Authorization);
    headers.set('Content-Type', 'application/json');

    return fetch(API_URL_TICKET, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          Alert.alert(json.error.msg);
        } else {
          Alert.alert(
            'API DAQ',
            JSON.stringify(json.data.tipo) +
              ' ' +
              JSON.stringify(json.data.id) +
              '\n Bateria: ' +
              JSON.stringify(json.data.atributos.bateria) +
              '\n ID DAQ: ' +
              JSON.stringify(json.data.atributos.id_daq) +
              '\n ID Ticket: ' +
              JSON.stringify(json.data.atributos.id_ticket) +
              '\n IRE: ' +
              JSON.stringify(json.data.atributos.ire) +
              '\n Latitud: ' +
              JSON.stringify(json.data.atributos.latitud) +
              '\n Longitud: ' +
              JSON.stringify(json.data.atributos.longitud) +
              '\n Pozo: ' +
              JSON.stringify(json.data.atributos.pozo) +
              '\n Presion: ' +
              JSON.stringify(json.data.atributos.presion) +
              '\n Producto: ' +
              JSON.stringify(json.data.atributos.producto) +
              '\n Temperatura: ' +
              JSON.stringify(json.data.atributos.temperatura) +
              '\n Timestamp: ' +
              JSON.stringify(json.data.atributos.timestamp) +
              '\n Verificacion: ' +
              JSON.stringify(json.data.atributos.verificacion) +
              '\n Volumen Agregado: ' +
              JSON.stringify(json.data.atributos.volumen_agregado),
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: true},
          );
        }
      })
      .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        const mje_error = error;
        Alert.alert(
          'API DAQ ERROR',
          'Error: \n' + mje_error,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: true},
        );
      });
  }

  async getPosicion() {
    const athorozationHeader = await HeaderUtil.authHeader();
    var headers = new Headers();
    headers.set('Authorization', athorozationHeader.Authorization);
    headers.set('Content-Type', 'application/json');

    return fetch(API_URL_POSICION, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          Alert.alert(json.error.msg);
        } else {
          Alert.alert(
            'API DAQ',
            JSON.stringify(json.data.tipo) +
              ' ' +
              JSON.stringify(json.data.id) +
              '\n Latitud: ' +
              JSON.stringify(json.data.atributos.latitud) +
              '\n Longitud: ' +
              JSON.stringify(json.data.atributos.longitud) +
              '\n Curso: ' +
              JSON.stringify(json.data.atributos.curso) +
              '\n Dato Valido: ' +
              JSON.stringify(json.data.atributos.dato_valido) +
              '\n Fecha: ' +
              JSON.stringify(json.data.atributos.fecha) +
              '\n Posición Valida: ' +
              JSON.stringify(json.data.atributos.posicion_valida) +
              '\n Tiempo: ' +
              JSON.stringify(json.data.atributos.tiempo) +
              '\n Velocidad: ' +
              JSON.stringify(json.data.atributos.velocidad),
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: true},
          );
        }
      })
      .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        const mje_error = error;
        Alert.alert(
          'API DAQ ERROR',
          'Error: \n' + mje_error,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: true},
        );
      });
  }

  async getConfiguracion() {
    const athorozationHeader = await HeaderUtil.authHeader();
    var headers = new Headers();
    headers.set('Authorization', athorozationHeader.Authorization);
    headers.set('Content-Type', 'application/json');

    return fetch(API_URL_CONFIGURATION, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          Alert.alert(json.error.msg);
        } else {
          Alert.alert(
            'API DAQ',
            JSON.stringify(json.data.tipo) +
              ' ' +
              JSON.stringify(json.data.id) +
              '\n ID Caudalimetro 1: ' +
              JSON.stringify(json.data.atributos.id_caudalimetro_1) +
              '\n ID Caudalimetro 2: ' +
              JSON.stringify(json.data.atributos.id_caudalimetro_2) +
              '\n ID DAQ: ' +
              JSON.stringify(json.data.atributos.id_daq) +
              '\n ID Vehiculo: ' +
              JSON.stringify(json.data.atributos.id_vehiculo) +
              '\n Nombre Caudalimetro 1: ' +
              JSON.stringify(json.data.atributos.nombre_caudalimetro_1) +
              '\n Nombre Caudalimetro 2: ' +
              JSON.stringify(json.data.atributos.nombre_caudalimetro_2) +
              '\n Nombre Vehiculo: ' +
              JSON.stringify(json.data.atributos.nombre_vehiculo) +
              '\n Revisión Soft: ' +
              JSON.stringify(json.data.atributos.revision_soft) +
              '\n Timestamp Actualizado: ' +
              JSON.stringify(json.data.atributos.timestamp_actualizado) +
              '\n Timestamp Descargado: ' +
              JSON.stringify(json.data.atributos.timestamp_descargado) +
              '\n Verificacion: ' +
              JSON.stringify(json.data.atributos.verificacion),
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: true},
          );
        }
      })
      .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        const mje_error = error;
        Alert.alert(
          'API DAQ ERROR',
          'Error: \n' + mje_error,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: true},
        );
      });
  }

  async setConfiguracion() {
    const athorozationHeader = await HeaderUtil.authHeader();
    var headers = new Headers();
    headers.set('Authorization', athorozationHeader.Authorization);
    headers.set('Content-Type', 'application/json');

    return fetch(API_URL_CONFIGURATION, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({
        data: {
          id: '1',
          tipo: 'configuracion',
          atributos: {
            id_caudalimetro_1: '11',
            id_caudalimetro_2: '22',
            id_daq: '33',
            id_vehiculo: '44',
            nombre_caudalimetro_1: 'cau11',
            nombre_caudalimetro_2: 'cau22',
            nombre_vehiculo: 'veh11',
            revision_soft: '77',
            timestamp_actualizado: 'null',
            timestamp_descargado: '2021/03/12-01:33:00',
            verificacion: 'ABCDEF1234',
          },
        },
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          Alert.alert(json.error.msg);
        } else {
          Alert.alert(
            'API DAQ',
            JSON.stringify(json.data.tipo) +
              ' ' +
              JSON.stringify(json.data.id) +
              '\n ID Caudalimetro 1: ' +
              JSON.stringify(json.data.atributos.id_caudalimetro_1) +
              '\n ID Caudalimetro 2: ' +
              JSON.stringify(json.data.atributos.id_caudalimetro_2) +
              '\n ID DAQ: ' +
              JSON.stringify(json.data.atributos.id_daq) +
              '\n ID Vehiculo: ' +
              JSON.stringify(json.data.atributos.id_vehiculo) +
              '\n Nombre Caudalimetro 1: ' +
              JSON.stringify(json.data.atributos.nombre_caudalimetro_1) +
              '\n Nombre Caudalimetro 2: ' +
              JSON.stringify(json.data.atributos.nombre_caudalimetro_2) +
              '\n Nombre Vehiculo: ' +
              JSON.stringify(json.data.atributos.nombre_vehiculo) +
              '\n Revisión Soft: ' +
              JSON.stringify(json.data.atributos.revision_soft) +
              '\n Timestamp Actualizado: ' +
              JSON.stringify(json.data.atributos.timestamp_actualizado) +
              '\n Timestamp Actualizado: ' +
              JSON.stringify(json.data.atributos.timestamp_descargado) +
              '\n Verificacion: ' +
              JSON.stringify(json.data.atributos.verificacion),
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: true},
          );
        }
      })
      .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        const mje_error = error;
        Alert.alert(
          'API DAQ ERROR',
          'Error: \n' + mje_error,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: true},
        );
      });
  }

  async getRecorridos() {
    const athorozationHeader = await HeaderUtil.authHeader();
    var headers = new Headers();
    headers.set('Authorization', athorozationHeader.Authorization);
    headers.set('Content-Type', 'application/json');

    return fetch(API_URL_RECORRIDOS, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          Alert.alert(json.error.msg);
        } else {
          Alert.alert(json);
        }
      })
      .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        const mje_error = error;
        Alert.alert(
          'API DAQ ERROR',
          'Error: \n' + mje_error,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: true},
        );
      });
  }
}

export default new APIService();
