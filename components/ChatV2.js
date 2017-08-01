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
    var FirebaseUser = firebaseApp.auth().currentUser;
    this.messagesRef = FirebaseDB.ref(`messages/${this.props.navigation.state.params.channelKey}`);
    this.state = {
      user: FirebaseUser,
      loading: true,
      messages: []
    }
  }

  componentDidMount(){
    // start listening for firebase updates
    this.listenForMessages(this.messagesRef);
  }

  listenForMessages(messagesRef){
    //Get data from firebase and update listview accordingly
    messagesRef.on('value', (dataSnapshot) => {
      var messagesFB = [];
      dataSnapshot.forEach((child) => {
        messagesFB = [({
          _id: child.key,
          text: child.val().text,
          createdAt: child.val().createdAt,
          user: {
            _id: child.val().user._id,
            name: child.val().user.name,
            avatar: child.val().user.avatar
          }
        }), ...messagesFB];
      });
      console.log(messagesFB);

      this.setState({
        messages: messagesFB
      });
    });
  }

  addMessage(message = {}){
    console.log(message[0]);
    this.messagesRef.push({
      text: message[0].text,
      createdAt: Date.now(),
      user: {
        _id: message[0].user._id,
        name: message[0].user.name,
        avatar: message[0].user.avatar
      }
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
            _id: this.state.user.uid,
            name: this.state.user.email,
            avatar: 'https://s-media-cache-ak0.pinimg.com/736x/8a/9d/5d/8a9d5dfc5c3bcaff8958c479481df668--sticker-vinyl-car-decals.jpg'
          }}
        />
      </View>
    );
  }
}

export default ChatV2;
