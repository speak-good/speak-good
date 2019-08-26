import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, Home} from './components'
import Demo from './components/demo'
import Record from './components/record'
import Recordings from './components/recordings'
import SingleRecording from './components/singleRecording'
import SelectPose from './components/training'
import TrainingSinglePose from './components/trainingSinglePose'
import {me} from './store'
import UserProfile from './components/UserProfile'
import NotFound from './components/notFound'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/train" component={SelectPose} />
        <Route exact path="/train/:poseName" component={TrainingSinglePose} />
        <Route exact path="/demo" component={Demo} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            {/* <Route exact path="/recordings" component={Recordings} /> */}
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/record" component={Record} />
            <Route exact path="/recordings/:id" component={SingleRecording} />
            <Route path="*" component={NotFound} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
