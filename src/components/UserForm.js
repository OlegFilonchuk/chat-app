import React, {Component} from 'react'

class UserForm extends Component {

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
    this.props.choseUser(this.state.value)
    this.setState({
      value: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder='Who are you?..'
          />
        </form>
      </div>
    )
  }
}

export default UserForm