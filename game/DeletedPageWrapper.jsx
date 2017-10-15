import React from 'react'
import {Route} from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()

import DeletedPage from './components/DeletedPage'

export default ({params: {uid}}) =>
    <div className='gamePage'>
      <DeletedPage fireRef={db.ref('board').child(uid)} wrapperId={uid}/>
  </div>
