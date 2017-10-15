'use strict'
import React from 'react'
import {Router, Route, Link, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Alert from 'react-s-alert'

import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Navbar from './components/Navbar'
import firebase from 'APP/fire'
import Game from 'APP/game'

injectTapEventPlugin()

const auth = firebase.auth()
auth.onAuthStateChanged(user => user || auth.signInAnonymously())
// var authData = firebase.getAuth()
// if (authData) {
//   console.log('Authenticated user with uid:', authData.uid)
// }

const App = ({children}) => (
    <MuiThemeProvider>
      <div>
        <Navbar/>
        {children}
        <Alert stack={{limit: 3}} position='bottom-right' effect='slide'/>
      </div>
    </MuiThemeProvider>
)

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="home"/>
      {Game}
    </Route>
  </Router>,
  document.getElementById('main')
)
