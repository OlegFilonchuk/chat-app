import React, {Component} from 'react'

class NewMessageForm extends Component {

  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  handleChange = ev => {
    this.setState({
      value: ev.currentTarget.value
    })
  }

  handleSubmit = ev => {
    ev.preventDefault()
    /*send message*/
    console.log('---', this.state.value)
    this.setState({
      value: ''
    })
  }

  render() {
    return (
      <form
        className="new-message-form"
        onSubmit={this.handleSubmit}
      >
        <input
          value={this.state.value}
          onChange={this.handleChange}
          type="text"
          placeholder="Type a message and hit ENTER"
        />
      </form>
    )
  }
}

export default NewMessageForm