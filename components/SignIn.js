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
        'The Email and Password cannot be blank. Please sign in to continue.',
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
      <View style={styles.containerLogin}>
        <StatusBar
          barStyle="light-content"
        />
        <Text style={styles.appTitle}>
          Chatypus!
        </Text>
        <Image
          source={{uri: "https://firebasestorage.googleapis.com/v0/b/chattest-9a63a.appspot.com/o/platypus_logo_small_white.png?alt=media&token=798540a7-8600-41b4-8ac3-27ee17047db8"}}
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
      </View>
    );
  }
}

export default SignIn;