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
  View
} from 'react-native';
import firebaseApp from './firebaseConfig.js';
import styles from './styles.js';

class SignUp extends Component {
  static navigationOptions = {
    title: 'SignUp',
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

  async signUp() {
    if (this.state.email != '' && this.state.password != '') {
      try {
        await firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
        console.log(this.state.email + ' signed up');
        this.props.navigation.navigate('Channels');
      } catch(error) {
      console.log(error.toString());
      Alert.alert(error.toString());
      }
    }
    else {
      Alert.alert(
        'Invalid Sign In',
        'The Email and Password cannot be blank. Please sign in to continue.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }

  goToSignIn() {
    this.props.navigation.goBack();
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
        <Image
          source={require('../images/platypusLogoSmallWhite.png')}
          style={{width: 150, height: 150, marginBottom: 30}}
        />
        <Text style={{color: 'white', alignSelf: 'flex-start', marginLeft: 50}}>Email</Text>
        <TextInput
          style={styles.textInput}
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
        <TouchableHighlight style={styles.loginButton}
          onPress={this.signUp.bind(this)}
          underlayColor={'#1E90FF'}
        >
          <Text style={styles.loginButtonText}>
            Sign Up
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.goToSignIn()}
          underlayColor={'#1E90FF'}
        >
          <Text style={styles.loginLowerText}>Sign In</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default SignUp;
