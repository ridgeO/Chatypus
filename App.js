'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import Channels from './components/Channels.js';
import Chat from './components/Chat.js'

const RootNavigator = StackNavigator(
  {
    Login: { name: 'SignIn', screen: SignIn },
    SignUp: { name: 'SignUp', screen: SignUp },
    Channels: { name: 'Channels', screen: Channels },
    Chat: { name: 'Chat', screen: Chat }
  },
  { headerMode: 'screen' }
);

AppRegistry.registerComponent('Chatypus', () => RootNavigator);
