import React, {Component} from 'react'

class NewRoomForm extends Component {

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
    this.props.createRoom(this.state.value)
    this.setState({
      value: ''
    })
  }

  render() {
    return (
      <div className="new-room-form">
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.value}
            onChange={this.handleChange}
            type="text"
            placeholder="NewRoomForm"
            required
          />
          <button id="create-room-btn" type="submit">+</button>
        </form>
      </div>
    )
  }
}

export default NewRoomForm