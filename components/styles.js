'use strict';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
  },
  appTitle: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '200',
    marginBottom: 30
  },
  /*lowerButtonContainer: {
    bottom: 60,
    width: 300,
    height: 300,
    backgroundColor: '#f9f9f9'
  },*/
  loginButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 4,
    padding: 16,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20
  },
  textInput: {
    height: 52,
    color: '#fff',
    fontSize: 20,
    textAlign: 'left',
    backgroundColor: '#1E90FF',
    borderBottomWidth: 2,
    marginBottom: 5,
    marginLeft: 50,
    marginRight: 50,
    borderBottomColor: '#fff'
  },
  inputContainer: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2
  },
  loginLowerText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 15,
    marginTop: 10
  },
  containerChannels: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#1E90FF',
  },
  channelsTopper: {
    color: '#fff',
    fontSize: 28,
    top: 20
  },
  channelsContainer: {
    top: 40
  },
  newChannelInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomColor: '#f9f9f9',
    borderBottomWidth: 2,
    top: 30
  },
  newChannelInput: {
    flex: 1,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
    color: '#1E90FF',
    borderColor: '#f9f9f9',
    borderWidth: 2,
    borderRadius: 4,
    margin: 10
  },
  newChannelButton: {
    alignItems: 'center',
    marginRight: 20
  },
  newChannelButtonText: {
    color: '#1E90FF',
    fontSize: 18
  },
  listContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#fff'
  },
  liContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  li: {
    flex: 1,
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liText: {
    color: '#1E90FF',
    fontSize: 22,
  },
  containerChat: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  chatTopper: {
    color: '#fff',
    fontSize: 28,
    top: 20
  },
  chatTopperNav: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '400'
  },
  chatBackNav: {
    color: '#fff'
  },
  messagesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  messageBubbleSelf: {
    padding: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    margin: 5
  },
  messageTextSelf: {
    fontSize: 18,
    color: '#fff'
  },
  messageBubbleOther: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    margin: 5
  },
  messageTextOther: {
    fontSize: 18,
    color: '#606060'
  },
  newMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#f9f9f9',
    bottom: 0
  },
  newMessageInput: {
    flex: 1,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
    color: '#1E90FF',
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 4,
    margin: 10
  },
  newMessageButton: {
    alignItems: 'center',
    marginRight: 20
  },
  newMessageButtonText: {
    color: '#1E90FF',
    fontSize: 18
  }
})

export default styles;
