import React, {Component} from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {addPixel} from '../reducers/pixel'

class AddPixel extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
  }
  onPixelSubmit(event) {
    event.preventDefault()
    console.log('EVENT TARGETSSSS', event.target)
    console.log(event.target.color)
    console.log(event.target.day)
    console.log(event.target.content)
    let pixelInfo = {
      color: event.target.color.value,
      day: event.target.day.value,
      content: event.target.content.value
    }
    this.props.addAPixel(pixelInfo.color, pixelInfo.day, pixelInfo.content)
    browserHistory.push(`/pixels/${this.props.wrapperId}`)
  }

  render() {
    this.onPixelSubmit = this.onPixelSubmit.bind(this)
    console.log('ADDDDDD PIXELSSSSSS AFTER RENDER', this.props.pixels)

    return (
      <div className="gamePage">
      <h1>Add a Pixel</h1>
        <div>
          <br></br>
          <a href="/mirror.html"> Click here for the mirror page to check your mood!</a>
          <br></br>
        </div>
        <div className="row col-lg-4">
          <form onSubmit={this.onPixelSubmit}>
          <div className="form-group">
            <label htmlFor="color">Pixel Color:</label>
            <input className="form-control" type="color" id="color" />
          </div>
          <div className="form-group">
            <label htmlFor="day">Date: </label>
            <input className="form-control" type="date" id="day" />
          </div>
          <div className="form-group">
            <label htmlFor="content">What happened on this day: </label>

            <textarea className="form-control" cols="40" rows="5" id="content"></textarea>
          </div>

            <button className="btn btn-default" type="submit">Add New Pixel</button>
          </form>

        </div>
      </div>
    )
  }
}
// -- // -- // Container // -- // -- //

const mapState = ({ pixel }) => ({
  pixels: pixel.pixels
})

const mapDispatch = dispatch => ({
  addAPixel: (pixelColor, pixelDay, pixelContent) => {
    dispatch(addPixel(pixelColor, pixelDay, pixelContent))
  }

})

export default connect(mapState, mapDispatch)(AddPixel)
