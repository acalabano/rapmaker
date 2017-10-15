import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {removePixel, updatePixel, loadPixel, createPixelTask} from '../reducers/pixel'
import {createTask, removeTask, updateTask, getTasks} from '../reducers/task'
import firebase from 'APP/fire'

class OnceTasks extends React.Component {
  constructor(props) {
    super(props)
    this.onTaskSubmit=this.onTaskSubmit.bind(this)
    this.removeTaskCallback=this.removeTaskCallback.bind(this)
    this.markTaskDone=this.markTaskDone.bind(this)
    this.onResetTasks=this.onResetTasks.bind(this)
  }

  onTaskSubmit(event) {
    event.preventDefault()
    let taskInfo = {
      content: event.target.taskContent.value,
      done: false,
      taskFrequency: event.target.taskFrequency.value,
    }
    this.props.addATask(taskInfo.content, taskInfo.done, taskInfo.taskFrequency, this.props.pixels.get(this.props.pixelId).pixelDay)
  }

  removeTaskCallback(index) {
    const removeATask = this.props.removeATask
    removeATask(index)
    const todayTasks= this.props.tasks.filter((task) => task.taskDay=== this.props.pixels.get(parseInt(this.props.pixelId)).pixelDay)
    if (todayTasks.size-1 <=0 || (todayTasks.filter((task) => task.taskDone === true)).size-1 <=0) {
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
    let todayTasks= this.props.tasks.filter((task) => task.taskDay=== this.props.pixels.get(parseInt(this.props.pixelId)).pixelDay)
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
    let todayTasks= this.props.tasks.filter((task) => task.taskDay=== this.props.pixels.get(parseInt(this.props.pixelId)).pixelDay)
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
    console.log('BEFORE THE RETURN, THESE ARE THE PROPS pixels FROM THE ONCE TASKS COMPONENT', this.props)

    let thatPixel=this.props.pixels.get(parseInt(this.props.pixelId))
    return (
      <div>
        <hr />
        <div className="row">
        <div className="col-lg-4">
          <form onSubmit={this.onTaskSubmit}>
            <label htmlFor="taskContent" className="mr-sm-2"> Task Content: </label>
          <div className="form-group">
            <input className="form-control" placeholder="Do my project, make a thing" type="text" id="taskContent"></input>
          </div>
          <select id="taskFrequency">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
          </select>
            <button className="btn btn-default" type="submit">Add Task</button>
          </form>
        </div>
        </div>
        <br></br>
        <h2>Once Tasks</h2>
        <div>
        <button className="btn btn-warning" onClick={() => this.onResetTasks('daily')}>Reset my Dailies</button>
          <div className="container-fluid">
             <div className="row">
               <div className="col-lg-6">
               <h3>Incomplete tasks</h3>
                 {
                   this.props.tasks.map(task => {
                     let taskIndex= this.props.tasks.indexOf(task)
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
               <div>
              </div>
             </div>
             <div className="col-lg-6">
             <h3>Done!</h3>

              </div>
            </div>
           </div>
         </div>
      </div>
    )
  }
}

/* ---CONTAINERS--- */
const mapStateToProps = (state, ownProps) => ({
  pixels: state.pixel.pixels,
  tasks: state.task.tasks,
  userId: ownProps.userId,
  pixelId: ownProps.pixelId,
  pixelColor: ownProps.pixelColor
})

const mapDispatchToProps = (dispatch) => ({
  removeOnePixel: (pixelId) => {
    dispatch(removePixel(pixelId))
  },
  updateOnePixel: (pixelId, pixelColor, pixelDay, pixelContent, pixelTasks) => {
    console.log('DISPATCHING WORKS?', pixelColor)
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
  updateATask: (taskId, taskDone) => {
    dispatch(updateTask(taskId, taskDone))
  },
  loadTasks: () => {
    dispatch(getTasks())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OnceTasks)
