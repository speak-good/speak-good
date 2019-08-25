import React, {Component} from 'react'
import {fetchRecordings} from '../store/recordings'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class UserProfile extends Component {
  componentDidMount() {
    this.props.fetchRecordings()
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
    console.log('PROPS ARE: ', this.props)
    return (
      <div className="profile-body">
        <h3>Welcome back, {this.props.firstName}</h3>
        <div id="recordingList">
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
              <Link to="/train/MountainPose">
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
          <h3>Your Past Recordings:</h3>
          {allRecording.map(recording => (
            <div className="campus card" key={recording.id}>
              <div>
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
