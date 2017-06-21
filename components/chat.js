'use strict'
import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar,
  KeyboardAvoidingView,
  View
} from 'react-native';
import firebaseApp from './firebaseConfig.js';
import styles from './styles.js';

class chat extends Component {
  static navigationOptions = {
    title: 'Chat',
    header: null
    //headerStyle: {backgroundColor: '#1E90FF'},
    //headerTitleStyle: styles.chatTopperNav,
    //headerBackTitleStyle: styles.chatBackNav
  };

  constructor(props) {
    super(props);
    var FirebaseDB = firebaseApp.database();
    this.messagesRef = FirebaseDB.ref('messages/' + 'channelId');
    this.state = {
      user:null,
      loading: true,
      newMessage: ""
    }
  }

  componentDidMount(){
    // start listening for firebase updates
    this.listenForMessages(this.messagesRef);
  }

  listenForMessages(messagesRef){
    //Get data from firebase and update listview accordingly
    messagesRef.on('value', (dataSnapshot) => {
      var messages = [];
      dataSnapshot.forEach((child) => {
        messages.push({
          user: child.val().user,
          msg: child.val().msg,
          key: child.key
        });
      });

      this.setState({
        messages:messages
      });
      console.log(messages)
    });
  }

  addMessage(){
    this.messagesRef.push({
      user: 'J',
      msg: this.state.newMessage,
    })
    this.setState({
      newMessage: ''
    })
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
            <TextInput style={styles.newMessageInput} placeholder={"New Message"}
              onChangeText={(text) => this.setState({newMessage: text})}
              value={this.state.newMessage}
            />
            <TouchableHighlight style={styles.newMessageButton}
              onPress={() => this.addMessage()}
            >
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
