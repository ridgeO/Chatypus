'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar,
  Alert,
  View
} from 'react-native';
import firebaseApp from './firebaseConfig.js';
import styles from './styles.js';

class login extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  };

  constructor(props){
    super(props);
    this.state = {
      loaded: true,
      displayName: '',
    }
  }

  async signIn() {
    if (this.state.displayName != '') {
      try {
        await firebaseApp.auth().signInAnonymously();
          console.log('logged in ' + this.state.displayName);
          this.props.navigation.navigate('Channels');
      } catch(error) {
      console.log(error.toString());
      }
    }
    else {
      Alert.alert(
        'Enter a Display Name',
        'The Display Name cannot be blank. Please enter a name to continue.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    return (
      <View style={styles.containerLogin}>
        <StatusBar
          barStyle="light-content"
        />
        <Text style={styles.appTitle}>
          Chatypus!
        </Text>
        <View style={styles.lowerButtonContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={"Display Name"}
              onChangeText={(text) => this.setState({displayName: text})}
            />
          </View>
          <TouchableHighlight style={styles.loginButton}
            onPress={this.signIn.bind(this)}
          >
            <Text style={styles.loginButtonText}>
              Start Chatting
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default login;
