import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TextInput, Picker} from 'react-native';
import * as constants from '../util/constants';
import APIService from '../service/APIService';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export class ApiTestSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: '',
      verbs: constants.HTTP_VERBS,
      custumURL: constants.BASE_URL_DAQ_API,
      custumVerb: constants.HTTP_VERB_DEFAULT,
      customBody: '',
    };
  }

  async getTicket() {
    const result = await APIService.getTicket();
    this.handleLangChange(result);
  }

  async getPosicion() {
    const result = await APIService.getPosicion();
    this.handleLangChange(result);
  }

  async getConfiguracion() {
    const result = await APIService.getConfiguracion();
    this.handleLangChange(result);
  }

  async setConfiguracion() {
    const result = await APIService.setConfiguracion();
    this.handleLangChange(result);
  }

  async getRecorridos() {
    const result = await APIService.getRecorridos();
    this.handleLangChange(result);
  }

  async endpoint() {
    const {custumURL, custumVerb, customBody} = this.state;
    const result = await APIService.excuteEndpoint(
      custumURL,
      custumVerb,
      customBody,
    );
    this.handleLangChange(result);
  }

  handleLangChange = (result) => {
    result
      ? this.props.onSelectLanguage(constants.GRAY_COLOR)
      : this.props.onSelectLanguage(constants.BLUE_COLOR);
  };

  render() {
    const color = this.props.color;
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
          <Text style={styles.sectionTitle}>Preset Endpoint</Text>

          <View style={{marginTop: 10, marginBottom: 10}}>
            <Button
              color={color}
              title="Get Ticket"
              onPress={() => this.getTicket()}
            />
          </View>
          <View style={{marginTop: 10, marginBottom: 10}}>
            <Button
              color={color}
              title="Get Posicion"
              onPress={() => this.getPosicion()}
            />
          </View>
          <View style={{marginTop: 10, marginBottom: 10}}>
            <Button
              color={color}
              title="Get Configuracion"
              onPress={() => this.getConfiguracion()}
            />
          </View>
          <View style={{marginTop: 10, marginBottom: 10}}>
            <Button
              color={color}
              title="Set Configuracion"
              onPress={() => this.setConfiguracion()}
            />
          </View>
          <View style={{marginTop: 10, marginBottom: 10}}>
            <Button
              color={color}
              title="Busqueda ID"
              onPress={() => this.getRecorridos()}
            />
          </View>

          <Text style={styles.sectionTitle}>Custom Endpoint</Text>

          <View style={{marginTop: 10, marginBottom: 10}}>
            <TextInput
              value={this.state.custumURL}
              onChangeText={(custumURL) => this.setState({custumURL})}
              placeholder={'custom url'}
              style={styles.inputLogin}
              autoCapitalize="none"
            />
            <Picker
              selectedValue={this.state.custumVerb}
              style={styles.picker}
              onValueChange={(custumVerb) => this.setState({custumVerb})}>
              {this.state.verbs.map((s, i) => {
                return <Picker.Item key={i} value={s} label={s} />;
              })}
            </Picker>
            <View style={styles.textAreaContainer}>
              <TextInput
                value={this.state.customBody}
                onChangeText={(customBody) => this.setState({customBody})}
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="body of request"
                numberOfLines={10}
                multiline={true}
                autoCapitalize="none"
              />
            </View>
            <View style={{marginTop: 20, marginBottom: 10}}>
              <Button
                color={color}
                title="ENDPOINT"
                onPress={() => this.endpoint()}
              />
            </View>
          </View>

          <View style={{marginTop: 50}}></View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 25,
    paddingHorizontal: 24,
  },
  separatorTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  inputLogin: {
    height: 44,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  picker: {
    height: 44,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  textAreaContainer: {
    borderColor: constants.BLACK_COLOR,
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  sectionTitle: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '600',
  },
});

export default ApiTestSection;
