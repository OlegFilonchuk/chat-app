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
      messages: []
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
        currentUser.subscribeToRoom({
          roomId: 19373237,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        })
      })
  }

  render() {
    return (
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages}/>
        <NewRoomForm/>
        <NewMessageForm/>
      </div>
    )
  }
}

export default App;
