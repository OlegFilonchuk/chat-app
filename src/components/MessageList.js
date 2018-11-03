import React, {Component} from 'react'

class MessageList extends Component {
  render() {
    return (
      <div className='message-list'>
        {this.props.messages.map((message, index) => {
          return (
            <div key={index}>{message.senderId}: {message.text}</div>
          )
        })}
      </div>
    )
  }
}

export default MessageList