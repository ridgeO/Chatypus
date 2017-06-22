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
import firebaseApp from './firebaseConfig.js';
import styles from './styles.js';

class Chat extends Component {
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
    });
  }
  renderRow(item){
    if (this.state.user === item.user){
      return(
        <View style={styles.messageBubbleSelf}>
          <Text style={styles.messageTextSelf}>{item.msg}</Text>
        </View>
      )
    } else {
      return(
        <View style={styles.messageBubbleOther}>
          <Text style={styles.messageTextOther}>{item.msg}</Text>
        </View>
      )
    }
  }

  addMessage(){
    this.messagesRef.push({
      user: this.state.user,
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
            <FlatList
              data={this.state.messages}
              renderItem={({item}) => (this.renderRow(item))}
              initialScrollIndex={Object(this.state.messages, this.state.messages).length}
            />
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

export default Chat;
