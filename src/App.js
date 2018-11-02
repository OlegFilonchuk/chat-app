import React, { Component } from 'react'
import MessageList from './components/MessageList'
import Chatkit from '@pusher/chatkit'
import { tokenUrl, instanceLocator } from './config.js'

class App extends Component {

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
              console.log('-----', 'message text:', message.text)
            }
          }
        })
      })
  }

  render() {
    return (
      <div className="App">
        <MessageList>

        </MessageList>
      </div>
    );
  }
}

export default App;
