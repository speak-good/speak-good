import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <header>
    <div className="logo">
      <Link to="/">
        <img alt="logo" src="images/logo.png" />
      </Link>
    </div>
    <div id="navbar">
      {isLoggedIn ? (
        <nav>
          <div className="nav-item">
            <Link to="/record">Record</Link>
          </div>
          {/* <div className="nav-item">
            <Link to="/recordings">Recordings</Link>
          </div> */}
          <div className="nav-item">
            <Link to="/profile">Profile</Link>
          </div>
          {/* <div className="nav-item">
            <Link to="/home">Home</Link>
          </div> */}
          <div className="nav-item">
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </nav>
      ) : (
        <nav id="nav-trio">
          <div className="nav-item">
            <Link to="/demo">Demo</Link>
          </div>
          <div className="nav-item">
            <Link to="/login">Login</Link>
          </div>
          <div className="nav-item">
            <Link to="/signup">Sign Up</Link>
          </div>
        </nav>
      )}
    </div>
  </header>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
