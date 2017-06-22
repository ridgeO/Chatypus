'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import Channels from './components/Channels.js';
import ChatV2 from './components/ChatV2.js'

const RootNavigator = StackNavigator(
  {
    Login: { name: 'SignIn', screen: SignIn },
    SignUp: { name: 'SignUp', screen: SignUp },
    Channels: { name: 'Channels', screen: Channels },
    Chat: { name: 'Chat', screen: ChatV2 }
  },
  { headerMode: 'screen' }
);

AppRegistry.registerComponent('Chatypus', () => RootNavigator);
