import React from 'react'
import {Route} from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()

import AddPixelPage from './components/AddPixelPage'

export default ({params: {uid}}) =>
    <div className='gamePage'>
      <AddPixelPage fireRef={db.ref('board').child(uid)} wrapperId={uid}/>
  </div>
