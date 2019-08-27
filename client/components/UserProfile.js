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

    let hour = {
      '00': {
        time: 8,
        day: 'pm'
      },
      '01': {
        time: 9,
        day: 'pm'
      },
      '02': {
        time: 10,
        day: 'pm'
      },
      '03': {
        time: 11,
        day: 'pm'
      },
      '04': {
        time: 12,
        day: 'am'
      },
      '05': {
        time: 1,
        day: 'am'
      },
      '06': {
        time: 2,
        day: 'am'
      },
      '07': {
        time: 3,
        day: 'am'
      },
      '08': {
        time: 4,
        day: 'am'
      },
      '09': {
        time: 5,
        day: 'am'
      },
      '10': {
        time: 6,
        day: 'am'
      },
      '11': {
        time: 7,
        day: 'am'
      },
      '12': {
        time: 8,
        day: 'am'
      },
      '13': {
        time: 9,
        day: 'am'
      },
      '14': {
        time: 10,
        day: 'am'
      },
      '15': {
        time: 11,
        day: 'am'
      },
      '16': {
        time: 12,
        day: 'pm'
      },
      '17': {
        time: 1,
        day: 'pm'
      },
      '18': {
        time: 2,
        day: 'pm'
      },
      '19': {
        time: 3,
        day: 'pm'
      },
      '20': {
        time: 4,
        day: 'pm'
      },
      '21': {
        time: 5,
        day: 'pm'
      },
      '22': {
        time: 6,
        day: 'pm'
      },
      '23': {
        time: 7,
        day: 'pm'
      }
    }

    let formattedDate = unformattedDate => {
      let year = unformattedDate.slice(0, 4)
      let month = unformattedDate.slice(5, 7)
      let day = unformattedDate.slice(8, 10)
      return months[month] + ' ' + day + ', ' + year
    }
    let formattedTime = unformattedTime => {
      let newTime = unformattedTime.slice(11)
      let newhour = newTime.slice(0, 2)
      let newmin = newTime.slice(3, 5)
      return hour[newhour].time + ':' + newmin + ' ' + hour[newhour].day
    }

    const {allRecording} = this.props.recordings
    let filteredRecordings = recordings => {
      let newOrder = []
      for (let i = recordings.length - 1; i >= 0; i--) {
        newOrder.push(recordings[i])
      }
      return newOrder
    }
    return (
      <div id="top-margin">
        <h2 id="past-recordings-header">
          Welcome back
          {!this.props.firstName ? '!' : `, ${this.props.firstName}`}
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
        <h2 id="past-recordings-header">Your Past Recordings:</h2>
        {allRecording.length === 0 ? (
          <div id="no-past-recordings">None</div>
        ) : (
          <div id="map-container">
            {filteredRecordings(allRecording).map(recording => (
              <div key={recording.id}>
                <div>
                  <div className="card-body">
                    <button
                      id="delete-button"
                      type="button"
                      onClick={() => this.handleClick(recording)}
                    >
                      ✕
                    </button>
                    <Link to={`/recordings/${recording.id}`}>
                      <button type="button" className="past-recordings">
                        {/* <div id="button-container"> */}
                        {/* <div> */}
                        <div id="grade">
                          <h6 id="grade-text">Grade:</h6>

                          <p id="big-grade-text">{recording.grade}</p>
                        </div>
                        <div id="details">
                          <p>
                            {formattedDate(recording.createdAt)} at{' '}
                            {formattedTime(recording.createdAt)}
                          </p>
                          <p>
                            Preview:{' '}
                            {this.previewTranscript(recording.transcript)}
                          </p>
                        </div>
                        {/* </div> */}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
