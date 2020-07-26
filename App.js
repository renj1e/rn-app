/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

import { RNCamera } from 'react-native-camera';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Realm from 'realm';

class App extends Component {
  constructor(props){
    super(props)
  this.state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };
  }


  watchID: ?number = null;
  _initRealm = () => {
    const appId = 'piapp'; // Set Realm app ID here.
    const appConfig = {
    id: appId,
    timeout: 10000,
    };
  return new Realm.App(appConfig);
  }
  componentDidMount = () => {  
    this._initRealm()
    alert(getUniqueId())
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 10000},
    );
    this.watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  _onSuccess = e => {
    alert(JSON.stringify(e))

    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

  render(){
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
          flashMode={RNCamera.Constants.FlashMode.torch}
            style={styles.scrollView}>
            <Header />

      <View>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.lastPosition}
        </Text>
      </View>

            <QRCodeScanner
          onRead={this._onSuccess}
          topContent={
            <Text style={styles.centerText}>
              Go to{' '}
              <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
              your computer and scan the QR code.
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />

            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
                </Text>
              </View>
              <LearnMoreLinks />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );    
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
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default App;
