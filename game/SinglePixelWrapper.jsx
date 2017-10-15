import React from 'react'
import {Route} from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()

import SinglePixelPage from './components/SinglePixelPage'

export default ({params: {uid, hubId, pixelId}}) =>
    <div className='gamePage'>
      <SinglePixelPage fireRef={db.ref('board').child(uid).child(hubId)} userId={uid} hubId= {hubId} pixelId={pixelId}/>
  </div>
