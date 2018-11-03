import React from 'react'

export default function Message(props) {
  return (
    <div>
      {props.userName}: {props.text}
    </div>
  )
}