import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Login from 'APP/app/components/Login'
import WhoAmI from 'APP/app/components/WhoAmI'
import { NavItem, Navbar, Nav } from 'react-bootstrap'
import firebase from 'APP/fire'

/* -----------------    COMPONENT     ------------------ */

const NavbarComp = ({ auth, userId }) => {
  return (
        <nav className="navbar navbar-default navbar-fixed-top" style={{display: 'flex'}}>
          <div className="container">
          <ul className="nav navbar-nav">
            <li><Link to="/">HOME</Link></li>
            <li><Link to={`/lobby/${userId}`}>CLICK TO MAKE YOUR RAP</Link></li>
          </ul>
          </div>
          <div className="login-navbar">
            <WhoAmI auth={auth} />
          </div>
        </nav>

  )
}

// export default NavbarComp

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      currentUserId: '',
      currentUsername: '',
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUserId: user.uid, currentUsername: user.displayName })
      }
    })
  }

  render() {
    return <NavbarComp auth={firebase.auth()} userId= {this.state.currentUserId}/>
  }
}
