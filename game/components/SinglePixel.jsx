import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {createTask, removeTask, updateTask, getTasks} from '../reducers/task'
import {removePixel, updatePixel, loadPixel, createPixelTask} from '../reducers/pixel'
import firebase from 'APP/fire'

class SinglePixel extends React.Component {
  constructor(props) {
    super(props)
    this.props.loadSinglePixel(this.props.pixelId)
    this.state={
      deletedSuccesfully: false,
    }
    this.removePixelCallback=this.removePixelCallback.bind(this)
    this.onUpdatePixelSubmit=this.onUpdatePixelSubmit.bind(this)
    this.onTaskSubmit=this.onTaskSubmit.bind(this)
    this.removeTaskCallback=this.removeTaskCallback.bind(this)
    this.markTaskDone=this.markTaskDone.bind(this)
    this.onResetTasks=this.onResetTasks.bind(this)
  }

  componentWillMount() {
  }

  removePixelCallback(event) {
    const removeOnePixel = this.props.removeOnePixel
    event.stopPropagation()
    removeOnePixel(this.props.pixelId)
    const removeATask = this.props.removeATask
    const todayTasks= this.props.tasks.filter((task) => task.taskDay=== this.props.pixels.get(parseInt(this.props.pixelId)).pixelDay)
    todayTasks?todayTasks.forEach((task) => {
      const idx=this.props.tasks.indexOf(task)
      removeATask(idx)
    }):null
    todayTasks? todayTasks.pop():null
    this.setState({deletedSuccesfully: true})
    browserHistory.push(`/deleted/${this.props.userId}`)
  }

  onUpdatePixelSubmit(event) {
    event.preventDefault()
    const updatedPixelInfo = {
      day: event.target.day.value,
    }
    const todayTasks= this.props.tasks.filter((task) => task.taskDay=== this.props.pixels.get(parseInt(this.props.pixelId)).pixelDay)
    if (todayTasks) todayTasks.forEach(task => this.props.updateATask(this.props.tasks.indexOf(task), task.taskFrequency, updatedPixelInfo.day))
    this.props.updateOnePixel(this.props.pixelId, this.props.pixels.get(this.props.pixelId).pixelColor, updatedPixelInfo.day)
  }

  onTaskSubmit(event) {
    event.preventDefault()
    const taskInfo = {
      content: event.target.taskContent.value,
      done: false,
      taskFrequency: 'once',
    }
    this.props.hubId==='tutorial'? this.props.addATask("This task is special! It's being added just for this day! It's very speshulllll!", false, 'daily', this.props.pixels.get(parseInt(this.props.pixelId)).pixelDay):    
    this.props.addATask(taskInfo.content, taskInfo.done, taskInfo.taskFrequency, this.props.pixels.get(this.props.pixelId).pixelDay)
  }

  removeTaskCallback(index) {
    const removeATask = this.props.removeATask
    removeATask(index)
    const todayTasks= this.props.tasks.filter((task) => task.taskDay=== this.props.pixels.get(parseInt(this.props.pixelId)).pixelDay)
    if (todayTasks.size-1 <=0 || (todayTasks.filter((task) => task.taskDone === true)).size <=0) {
      this.props.updateOnePixel(this.props.pixelId, '#E3E3E3', this.props.pixels.get(this.props.pixelId).pixelDay, '')
    } else if (((todayTasks.filter((task) => task.taskDone === true).size-1) *1.0/todayTasks.size > (2.0/3)) && (todayTasks.size>=6)) {
      this.props.updateOnePixel(this.props.pixelId, '#006600', this.props.pixels.get(this.props.pixelId).pixelDay, '')
    } else if (((todayTasks.filter((task) => task.taskDone === true)).size-1) *1.0/todayTasks.size > (1.0/3) && (todayTasks.filter((task) => task.taskDone === true)).size >= 3) {
      this.props.updateOnePixel(this.props.pixelId, '#00FF00', this.props.pixels.get(this.props.pixelId).pixelDay, '')
    } else if ((todayTasks.filter((task) => task.taskDone === true)).size <=5 || (todayTasks.filter((task) => task.taskDone === true)).size-1 *1.0/todayTasks.size < (1.0/3)) {
      this.props.updateOnePixel(this.props.pixelId, '#CCFF99', this.props.pixels.get(this.props.pixelId).pixelDay, '')
    }
  }

  markTaskDone(idx) {
    this.props.updateATask(idx, true, this.props.pixels.get(this.props.pixelId).pixelDay)
    const todayTasks= this.props.tasks.filter((task) => task.taskDay=== this.props.pixels.get(parseInt(this.props.pixelId)).pixelDay)
    if (((todayTasks.filter((task) => task.taskDone === true).size+1) *1.0/(todayTasks).size > (2.0/3)) && (todayTasks.size>=6)) {
      this.props.updateOnePixel(this.props.pixelId, '#006600', this.props.pixels.get(this.props.pixelId).pixelDay, '')
    } else if (((todayTasks.filter((task) => task.taskDone === true)).size+1) *1.0/todayTasks.size > (1.0/3) && todayTasks.size >= 3) {
      this.props.updateOnePixel(this.props.pixelId, '#00FF00', this.props.pixels.get(this.props.pixelId).pixelDay, '')
    } else if (todayTasks.size <=5 || (todayTasks.filter((task) => task.taskDone === true)).size+1 *1.0/todayTasks.size < (1.0/3)) {
      this.props.updateOnePixel(this.props.pixelId, '#CCFF99', this.props.pixels.get(this.props.pixelId).pixelDay, '')
    }
  }

  markIncomplete(idx) {
    this.props.updateATask(idx, false, this.props.pixels.get(this.props.pixelId).pixelDay)
    const todayTasks= this.props.tasks.filter((task) => task.taskDay=== this.props.pixels.get(parseInt(this.props.pixelId)).pixelDay)
    if ((todayTasks.filter((task) => task.taskDone === false)).size+1 >= todayTasks.size) {
      this.props.updateOnePixel(this.props.pixelId, '#E3E3E3', this.props.pixels.get(this.props.pixelId).pixelDay, '')
    } else if (todayTasks.size <=5 || ((todayTasks.filter((task) => task.taskDone === false)).size+1) *1.0/todayTasks.size > (2.0/3)) {
      this.props.updateOnePixel(this.props.pixelId, '#CCFF99', this.props.pixels.get(this.props.pixelId).pixelDay, '')
    } else if (((todayTasks.filter((task) => task.taskDone === false)).size+1) *1.0/todayTasks.size > (2.0/6) && todayTasks.size>=3) {
      this.props.updateOnePixel(this.props.pixelId, '#00FF00', this.props.pixels.get(this.props.pixelId).pixelDay, '')
    } else if ((((todayTasks.filter((task) => task.taskDone === false)).size+1) *1.0/todayTasks.size > (1.0/3)) && (todayTasks.size> 5)) {
      this.props.updateOnePixel(this.props.pixelId, '#006600', this.props.pixels.get(this.props.pixelId).pixelDay, '')
    }
  }

  onResetTasks(frequencyString) {
    let todayTasks= this.props.tasks.filter((task) => task.taskDay=== this.props.pixels.get(parseInt(this.props.pixelId)).pixelDay)
    todayTasks.filter((task) => task.taskFrequency === frequencyString && task.taskDone === true).forEach(task => {
      const taskIndex= this.props.tasks.indexOf(task)
      this.markIncomplete(taskIndex)
    })
    this.props.updateOnePixel(this.props.pixelId, '#E3E3E3', this.props.pixels.get(this.props.pixelId).pixelDay, '')
  }

  render() {
    const thatPixel=this.props.pixels.get(parseInt(this.props.pixelId))
    const thatDay= thatPixel?thatPixel.pixelDay:undefined
    const filteredIncompleteTasks= this.props.tasks.filter((task) => task.taskDay==thatDay && task.taskDone === false)
    const filteredDoneTasks=this.props.tasks.filter((task) => task.taskDay==thatDay && task.taskDone == true)
    return (thatPixel)?
    (

      <div>
        <div className="row">
        <div className= "col-lg-6">
        <h1>{thatPixel.pixelDay} Pixel</h1>
        <div id="wrapper" style={{backgroundColor: thatPixel.pixelColor, width: `${10}vh`, height: `${10}vh`}}><p className="text">{thatPixel.pixelColor}</p></div>
        </div>
        <div className= "col-lg-6">
        <div className="row col-lg-4">
        </div>
        </div>
        </div>
        <hr />
        <div className="row col-lg-12">
          <button className="btn btn-danger" name="deletePixel" onClick={this.removePixelCallback}>Delete Pixel</button>

        </div>
        <hr />
        <div className="row">
        <div className="col-lg-4">
          <form onSubmit={this.onTaskSubmit}>
            <label htmlFor="taskContent" className="mr-sm-2"> Task Content: </label>
          <div className="form-group">
            <input className="form-control" placeholder="Do my project, make a thing" type="text" id="taskContent"></input>
          </div>
            <button className="btn btn-default" type="submit">Add an extra task just for today!</button>
          </form>
        </div>
        </div>
        <br></br>
        <h2>Your tasks for Today</h2>
        <div>
        <button className="btn btn-warning" onClick={() => this.onResetTasks('daily')}>Reset my Dailies</button>
          <div className="container-fluid">
             <div className="row">
               <div className="col-lg-6">
               <h3>Incomplete tasks</h3>
               <div>
               {
                 filteredIncompleteTasks.map(task => {
                   const taskIndex= this.props.tasks.indexOf(task)
                   return (
                     <div key={taskIndex}><input className="task-item" type="checkbox" onChange={(event) => {
                       event.preventDefault()
                       this.markTaskDone(taskIndex)
                     }}/>{task.taskContent} <button className="btn-danger" onClick={(event) => {
                       event.preventDefault()
                       this.removeTaskCallback(taskIndex)
                     }}>X</button></div>
                   )
                 })
               }
              </div>
             </div>
             <div className="col-lg-6">
             <h3>Done!</h3>
             {
               filteredDoneTasks.map(task => {
                 const taskIndex= this.props.tasks.indexOf(task)
                 return (
                   <div key={taskIndex}><input className="task-item" type="checkbox" checked={true} onChange={(event) => {
                     event.preventDefault
                     this.markIncomplete(taskIndex)
                   }}/>{task.taskContent} <button className="btn-danger" onClick={(event) => {
                     event.preventDefault()
                     this.removeTaskCallback(taskIndex)
                   }}>X</button></div>
                 )
               })
             }
              </div>
            </div>
           </div>
         </div>
      </div>
    ):null
  }
}

/* ---CONTAINERS--- */
const mapStateToProps = (state, ownProps) => ({
  pixels: state.pixel.pixels,
  tasks: state.task.tasks,
  userId: ownProps.userId,
  pixelId: ownProps.pixelId
})

const mapDispatchToProps = (dispatch) => ({
  removeOnePixel: (pixelId) => {
    dispatch(removePixel(pixelId))
  },
  updateOnePixel: (pixelId, pixelColor, pixelDay, pixelContent, pixelTasks) => {
    dispatch(updatePixel(pixelId, pixelColor, pixelDay, pixelContent, pixelTasks))
  },
  loadSinglePixel: (pixelId) => {
    dispatch(loadPixel(pixelId))
  },
  addAPixelTask: (pixelId, taskContent, taskDone, taskFrequency) => {
    dispatch(createPixelTask(pixelId, taskContent, taskDone, taskFrequency))
  },
  addATask: (taskContent, taskDone, taskFrequency, taskDay) => {
    dispatch(createTask(taskContent, taskDone, taskFrequency, taskDay))
  },
  removeATask: (taskId) => {
    dispatch(removeTask(taskId))
  },
  updateATask: (taskId, taskDone, taskDay) => {
    dispatch(updateTask(taskId, taskDone, taskDay))
  },
  loadTasks: () => {
    dispatch(getTasks())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SinglePixel)
