import React, { Component } from 'react'
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'
import NewMessageForm from './components/NewMessageForm'
import NewRoomForm from './components/NewRoomForm'

import Chatkit from '@pusher/chatkit'
import { tokenUrl, instanceLocator } from './config.js'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'oleg',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.getRooms()
      })
      .catch(err => console.log('---', `error on connecting: ${err}`))
  }

  getRooms = () => {
    this.currentUser.getJoinableRooms()
      .then((joinableRooms) => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(err => console.log('---', `error on joinable rooms: ${err}`))
  }

  subscribeToRoom = (roomId) => {
    this.setState({
      messages: []
    })
    this.currentUser.subscribeToRoom({
      roomId,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
      .then(room => {
        this.setState({
          roomId: room.id
        })
        this.getRooms()
      })
      .catch(err => console.log('---', `error on subscribing to room: ${err}`))
  }

  sendMessage = text => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }

  render() {
    return (
      <div className="app">
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList messages={this.state.messages}/>
        <NewRoomForm/>
        <NewMessageForm sendMessage={this.sendMessage}/>
      </div>
    )
  }
}

export default App;
