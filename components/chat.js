'use strict'
import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar,
  ListView,
  KeyboardAvoidingView,
  View
} from 'react-native';
import firebaseApp from './firebaseConfig.js';
import styles from './styles.js';

class chat extends Component {
  static navigationOptions = {
    title: 'Chat',
    headerStyle: {backgroundColor: '#1E90FF'},
    headerTitleStyle: styles.chatTopperNav,
    headerBackTitleStyle: styles.chatBackNav
  };

  constructor(props) {
    super(props);
    var FirebaseDB = firebaseApp.database();
    this._messagesRef = FirebaseDB.ref('channels/'+this.props.title);
    this._messages = [];
    this.state = {
      messages: this._messages,
      typingMessage: ''
    };
  }

  render() {
    return (
      <View style={styles.containerChat}>
        <StatusBar
          barStyle="light-content"
        />
        <KeyboardAvoidingView
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          behavior="padding"
        >
          <View style={styles.messagesContainer}>
            <View style={styles.messageBubbleSelf}>
              <Text style={styles.messageTextSelf}>Your Message</Text>
            </View>
            <View style={styles.messageBubbleOther}>
              <Text style={styles.messageTextOther}>Someone Elses Message</Text>
            </View>
          </View>
          <View style={styles.newMessageContainer}>
            <TextInput style={styles.newMessageInput} placeholder={"New Message"} multiline={true}/>
            <TouchableHighlight style={styles.newMessageButton}>
              <Text style={styles.newMessageButtonText}>
                Send
              </Text>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default chat;
