'use strict'
import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar,
  ListView,
  FlatList,
  View
} from 'react-native';
import firebaseApp from './firebaseConfig.js';
import styles from './styles.js';

class channels extends Component {
  static navigationOptions = {
    title: 'Channels',
    header: null
  };

  constructor(props){
    super(props);
    var firebaseDB = firebaseApp.database();
    this.channelsRef = firebaseDB.ref('channels');
    this.state = {
      user:null,
      loading: true,
      newChannel: ""
    }
  }

  componentDidMount(){
    // start listening for firebase updates
    this.listenForChannels(this.channelsRef);
  }

  listenForChannels(channelsRef){
    //Get data from firebase and update listview accordingly
    channelsRef.on('value', (dataSnapshot) => {
      var channels = [];
      dataSnapshot.forEach((child) => {
        channels.push({
          name: child.val().name,
          key: child.key
        });
      });

      this.setState({
        channels:channels
      });
      console.log(channels)
    });
  }

  addChannel(){
    //Add new channel to firebaseDB
    if (this.state.newChannel === "") {
      return;
    }
    this.channelsRef.push({ name: this.state.newChannel});
    this.setState({newChannel: ""});
    alert("Channel added");
  }

  openChat(){
    //Open channel to send/receive messages therein
    this.props.navigation.navigate('Chat');
  }

  render() {
    return (
      <View style={styles.containerChannels}>
        <StatusBar
          barStyle="light-content"
        />
        <Text style={styles.channelsTopper}>Chatypus</Text>
        <View style={styles.newChannelInputContainer}>
          <TextInput
            style={styles.newChannelInput}
            placeholder={"New Channel Name"}
            onChangeText={(text) => this.setState({newChannel: text})}
            value={this.state.newChannel}
          >
          </TextInput>
          <TouchableHighlight style={styles.newChannelButton}
            onPress={() => this.addChannel()}
            underlayColor="#fff"
          >
            <Text
              style={styles.newChannelButtonText}
            >
              Create
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.listContainer}>
          <View style={styles.liContainer}>
            <FlatList
              data={this.state.channels}
              renderItem={({item}) => (
                <TouchableHighlight style={styles.li}
                onPress={() => this.openChat()}
                underlayColor="#fff"
                >
                  <Text style={styles.liText}>{`${item.name} ${item.key}`}</Text>
                </TouchableHighlight>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default channels;
