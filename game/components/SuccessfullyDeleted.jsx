import React from 'react'
import { browserHistory } from 'react-router'

class SuccessfullyDeleted extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Pixel Successfully Deleted!
        </h1>
        <button className="btn btn-default" name="deletePixel" onClick={() => browserHistory.push(`/lobby/${this.props.wrapperId}`)}>Click to go Back to the Lobby</button>
      </div>
    )
  }
}

export default SuccessfullyDeleted
