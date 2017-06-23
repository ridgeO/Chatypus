'use strict'
import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar,
  KeyboardAvoidingView,
  FlatList,
  View
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseApp from './firebaseConfig.js';
import styles from './styles.js';

class ChatV2 extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.channelName} Chat`,
    headerStyle: {backgroundColor: '#1E90FF'},
    headerTitleStyle: styles.chatTopperNav,
    headerBackTitleStyle: styles.chatBackNav
  });

  constructor(props) {
    super(props);
    var FirebaseDB = firebaseApp.database();
    var FirebaseUser = firebaseApp.auth().currentUser.uid;
    this.messagesRef = FirebaseDB.ref(`messages/${this.props.navigation.state.params.channelKey}`);
    this.state = {
      user: FirebaseUser,
      loading: true,
      channelKey: this.props.navigation.state.params.channelKey,
      channelName: this.props.navigation.state.params.channelName,
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
        messages = [({
          _id: child.key,
          text: child.val().msg,
          createdAt: child.val().createdAt,
          user: { _id: child.val().user }
        }), ...messages];
      });
      console.log(messages);

      this.setState({
        messages: messages
      });
    });
  }

  addMessage(message = {}){
    console.log(message[0]);
    this.messagesRef.push({
      user: message[0].user._id,
      msg: message[0].text,
      createdAt: Date.now()
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="light-content"
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={this.addMessage.bind(this)}
          user={{
            _id: this.state.user
          }}
        />
      </View>
    );
  }
}

export default ChatV2;
