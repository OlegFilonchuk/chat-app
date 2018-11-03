import React from 'react'

export default function Message(props) {
  return (
    <div className="message">
      {props.userName}: {props.text}
    </div>
  )
}