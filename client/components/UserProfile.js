import React, {Component} from 'react'
import {fetchRecordings, deleteRecording} from '../store/recordings'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import firebaseConfig from '../../secrets'

class UserProfile extends Component {
  constructor() {
    super()
    this.initializeFirebase = this.initializeFirebase.bind(this)
  }

  initializeFirebase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
  }

  componentDidMount() {
    this.props.fetchRecordings()
    this.initializeFirebase()
  }

  deleteVideoFromFirebase = video => {
    let storageRef = firebase.storage().ref()
    let videoRef = storageRef.child(video)
    videoRef
      .delete()
      .then(function() {
        console.log('File deleted')
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  handleClick(recording) {
    this.props.deleteRecording(recording.id)
    this.deleteVideoFromFirebase(recording.video)
  }

  previewTranscript(fullTranscript) {
    let shortened = fullTranscript.slice(0, 30) + '...'
    return shortened
  }
  render() {
    let months = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    }

    let formattedDate = unformattedDate => {
      let year = unformattedDate.slice(0, 4)
      let month = unformattedDate.slice(5, 7)
      let day = unformattedDate.slice(8, 10)
      return months[month] + ' ' + day + ', ' + year
    }
    const {allRecording} = this.props.recordings
    return (
      <div id="top-margin">
        <h2 id="past-recordings-header">
          Welcome back, {this.props.firstName}
        </h2>
        <div id="profile-buttons-container">
          <div>
            <Link to="/record">
              <button
                id="profile-button-padding"
                type="button"
                className="profile-buttons"
              >
                Start New Recording
              </button>
            </Link>
          </div>
          <div>
            <Link to="/train/powerpose">
              <button
                id="profile-button-padding"
                type="button"
                className="profile-buttons"
              >
                Practice Power Pose
              </button>
            </Link>
          </div>
        </div>
        <h3 id="past-recordings-header">Your Past Recordings:</h3>
        <div id="map-container">
          {allRecording.map(recording => (
            <div key={recording.id}>
              <div>
                <div className="card-body">
                  <button
                    id="delete-button"
                    type="button"
                    onClick={() => this.handleClick(recording)}
                  >
                    X
                  </button>
                  <Link to={`/recordings/${recording.id}`}>
                    <button type="button" className="past-recordings">
                      <div id="button-container">
                        <div id="grade">
                          <p>{recording.grade}</p>
                        </div>
                        <div id="details">
                          <p>Date: {formattedDate(recording.createdAt)}</p>
                          <p>
                            Preview:{' '}
                            {this.previewTranscript(recording.transcript)}
                          </p>
                        </div>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    recordings: state.recordings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRecordings: function() {
      dispatch(fetchRecordings())
    },
    deleteRecording: function(recording) {
      dispatch(deleteRecording(recording))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
