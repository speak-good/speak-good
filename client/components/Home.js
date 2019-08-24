import React from 'react'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Link} from 'react-router-dom'
import Content from './HomepageContent'

const Home = props => {
  console.log(props)
  const {user, handleClick} = props
  console.log(props)
  return (
    <div>
      <div className="banner">
        <Content />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  // Hey, check it out! Because we pass the connected UserPage to a Route
  // (we do this in client/index.js), it receives the "route props"
  // (match, location, and history) as its "own props".
  const history = ownProps.history

  return {
    async handleClick() {
      const thunk = logout()
      await dispatch(thunk)
      history.push('/')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
