import React from 'react'
import {Route} from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()

import TasksPage from './components/TasksPage'

export default () =>
    <div className='lobbyPage'>
      <TasksPage tasksRef={db.ref('tasks')}/>
  </div>
