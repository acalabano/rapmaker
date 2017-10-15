'use strict'
import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import { PanelGroup, Panel } from 'react-bootstrap'
import WelcomePage from 'APP/app/components/WelcomePage'

import Signup from 'APP/app/components/Signup'
import Signin from 'APP/app/components/Signin'
import LobbyPageWrapper from './LobbyPageWrapper'
import GamePageWrapper from './GamePageWrapper'
import AddPixelWrapper from './AddPixelWrapper'
import SinglePixelWrapper from './SinglePixelWrapper'
import DeletedPageWrapper from './DeletedPageWrapper'

// const HomePage = ({ children }) => <div className='homepage-background'>
//   <div className="signin-signup-panel">
//     <Panel header="Sign up" ><Signup /></Panel>
//     <Signin />
//   </div>
// </div>

export default <Route path="/home" component={({ children }) => children}>
  <IndexRoute component={WelcomePage} />
  <Route path='/home' component={WelcomePage} />
  <Route path='/lobby/:uid' component={LobbyPageWrapper} />
  <Route path='/pixels/:uid/:hubId' component={GamePageWrapper} />
  <Route path='/pixels/:uid/add' component={AddPixelWrapper} />
  <Route path='/pixel/:uid/:hubId/:pixelId' component={SinglePixelWrapper} />
  <Route path='/deleted/:uid' component={DeletedPageWrapper} />

</Route>
