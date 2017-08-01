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
  Image,
  View,
  KeyboardAvoidingView
} from 'react-native';
import firebaseApp from './firebaseConfig.js';
import styles from './styles.js';
import LogoBounce from './LogoBounce.js';

class SignIn extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  };

  constructor(props){
    super(props);
    this.state = {
      loaded: true,
      email: '',
      password: ''
    }
  }

  async signIn() {
    if (this.state.email != '' && this.state.password != '') {
      try {
        await firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
        console.log(this.state.email + ' signed in');
        this.props.navigation.navigate('Channels');
      } catch(error) {
      console.log(error.toString());
      Alert.alert(error.toString());
      }
    }
    else {
      Alert.alert(
        'Invalid Sign In',
        'The Email and Password fields cannot be blank.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }

  goToSignUp() {
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardView}
        contentContainerStyle={styles.authContainer}
        behavior={'position'}
      >
        <StatusBar
          barStyle="light-content"
        />
        <LogoBounce />
        <Text style={styles.appTitle}>
          Chatypus!
        </Text>
        <Text style={{color: 'white', alignSelf: 'flex-start', marginLeft: 50}}>Email</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          placeholder={"example@email.com"}
          placeholderTextColor={'#fff'}
          onChangeText={(text) => this.setState({email: text})}
        />
        <Text style={{color: 'white', alignSelf: 'flex-start', marginLeft: 50}}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          placeholder={"password"}
          placeholderTextColor={'#fff'}
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableHighlight
          style={styles.loginButton}
          onPress={this.signIn.bind(this)}
          underlayColor={'#1E90FF'}
        >
          <Text style={styles.loginButtonText}>
            Start Chatting
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.goToSignUp()}
          underlayColor={'#1E90FF'}
        >
          <Text style={styles.loginLowerText}>Create Account</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }
}

export default SignIn;
