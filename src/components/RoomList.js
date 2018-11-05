import React, {Component} from 'react'

class RoomList extends Component {
  render() {
    console.log('---', this.props.rooms)
    return (
      <div className="room-list">
        <ul>
          <h3>Your rooms:</h3>
          {this.props.rooms.map(room => {
            return (
              <li key={room.id}>
                <a
                  onClick={() => {this.props.subscribeToRoom(room.id)}}
                  href="#"
                >
                  # {room.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default RoomList