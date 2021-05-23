/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  LogBox,
} from 'react-native';
import * as constants from './src/util/constants';
import WifiSection from './src/component/WifiSection';
import LoginSection from './src/component/LoginSection';
import ApiTestSection from './src/component/ApiTestSection';
import HeaderUtil from './src/util/HeaderUtil';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'Picker has been extracted',
  'Require cycle:',
]);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: constants.GRAY_COLOR,
    };
  }

  componentWillUnmount() {
    HeaderUtil.removeValue();
  }

  handleLanguage = (langValue) => {
    this.setState({color: langValue});
  };

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
          <WifiSection></WifiSection>

          <LoginSection onSelectLanguage={this.handleLanguage}></LoginSection>

          <ApiTestSection
            onSelectLanguage={this.handleLanguage}
            color={this.state.color}></ApiTestSection>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: constants.WHITE_COLOR,
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
    color: constants.BLACK_COLOR,
  },
  versionStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
});

export default App;
