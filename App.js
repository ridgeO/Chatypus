'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import login from './components/login.js';
import channels from './components/channels.js';
import chat from './components/chat.js'

const RootNavigator = StackNavigator(
  {
    Login : { name: 'Login', screen: login },
    Channels: { name: 'Channels', screen: channels },
    Chat: { name: 'Chat', screen: chat }
  },
  { headerMode: 'screen' }
);

AppRegistry.registerComponent('Chatypus', () => RootNavigator);
