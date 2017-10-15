'use strict'
import React from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {Grid, Row, Col, Clearfix, Image} from 'react-bootstrap'
import {addPixel, getPixels, sortPixels} from '../reducers/pixel'
import {createTask, removeTask} from '../reducers/task'
import reducer from '../reducers/'
import Loader from 'react-loader'
import firebase from 'APP/fire'

class AllPixels extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      currentUserId: '',
      currentUsername: '',
      addButtonClicked: false,
      loaded: false,
      repoName: '',
      addedTutorialTask: false
    }
    this.onPixelSubmit=this.onPixelSubmit.bind(this)
    this.onTaskSubmit=this.onTaskSubmit.bind(this)
    this.removeTaskCallback=this.removeTaskCallback.bind(this)
    this.onSort=this.onSort.bind(this)
  }

  componentDidMount() {
  //  setTimeout(() => this.setState({ loaded: true }), 5000))
    console.log('current state----', this.props.tasks.size)
    if (this.props.hubId==='tutorial') {
      this.props.addATask('This task is done daily', false, 'daily', '')
      this.props.addATask('Shower daily', false, 'daily', '')
      this.props.addATask('Apply to jobs', false, 'daily', '')
      this.props.addATask('Try to seem normal on the subway', false, 'daily', '')
      this.props.addATask('Bonus points if they smile', false, 'daily', '')
      this.props.addATask('Get to sleep before 2am', false, 'daily', '')
    }
  }

  onPixelSubmit(event) {
    event.preventDefault()
    let defaultTasks= this.props.tasks.filter((task) => task.taskDay=== '')
    let pixelInfo = {
      day: event.target.day.value,
    }
    this.props.addAPixel('#E3E3E3', pixelInfo.day, '')
    defaultTasks? defaultTasks.forEach((taskInfo) => this.props.addATask(taskInfo.taskContent, taskInfo.taskDone, taskInfo.taskFrequency, pixelInfo.day)):null
    this.setState({addButtonClicked: false})
  }

  onSort() {
    this.props.sortThePixels()
    console.log('THESE ARE THE Pixels SO FARRR', this.props.pixels)
  }
  onTaskSubmit(event) {
    event.preventDefault()
    let taskInfo = {
      content: event.target.taskContent.value,
      done: false,
      taskFrequency: 'daily',
    }
    this.props.addATask(taskInfo.content, taskInfo.done, taskInfo.taskFrequency, '')
    event.target.taskContent.value=''
  }

  removeTaskCallback(index) {
    const removeATask = this.props.removeATask
    removeATask(index)
  }

  render() {
    const defaultTasks=this.props.tasks.filter((task) => task.taskDay==='')
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth()+1
    const yyyy = today.getFullYear()
    const name=''
  //  console.log(this.props.games)

    if (dd<10) {
      dd = '0'+dd
    }

    if (mm<10) {
      mm = '0'+mm
    }

    today = yyyy + '-' + mm + '-' + dd
    let pixLength= this.props.pixels.size
    let height=60 + 'px'
    let width
    let columns= Array.from(new Array(Math.ceil(pixLength/7)), (x, i) => (i+1))
    let offset=Math.floor(12/columns.length)

    if (pixLength <= 1) {
      offset= 12
      height= 100/Math.ceil(pixLength) + 'vh'
      width=100/pixLength
      width=100/Math.ceil(pixLength/6)
    } else {
      offset=1
    }

    let columnsShown = columns.slice()
    if (columns.length > 12) {
      columnsShown= columns.slice(columns.length-12, columns.length)
    }

    return (
      <div className="">
        <h1>hello</h1>
      </div>
    )
  }
}

// -- // -- // Container // -- // -- //

const mapState = ({game, pixel, task}) => ({
  games: game.games,
  pixels: pixel.pixels,
  tasks: task.tasks
})

const mapDispatch = dispatch => ({
  addAPixel: (pixelColor, pixelDay, pixelContent) => {
    dispatch(addPixel(pixelColor, pixelDay, pixelContent))
  },
  loadPixels: () => {
    dispatch(getPixels())
  },
  sortThePixels: () => {
    dispatch(sortPixels())
  },
  addATask: (taskContent, taskDone, taskFrequency, taskDay) => {
    dispatch(createTask(taskContent, taskDone, taskFrequency, taskDay))
  },
  removeATask: (taskId) => {
    dispatch(removeTask(taskId))
  }
})

export default connect(mapState, mapDispatch)(AllPixels)
