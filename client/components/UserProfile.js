import React, {Component} from 'react'
import {fetchRecordings} from '../store/recordings'
// import PropTypes from 'prop-types'
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
    console.log('whats inhere', this.props)
    return (
      <div className="profile-body">
        <h3>Welcome back {this.props.email}</h3>
        <div id="recordingList">
          <div id="startnew">
            <Link to="/record">
              <h2>START NEW RECORDING</h2>
            </Link>
            <Link to="/train/MountainPose">
              <h2>Practice Power Pose</h2>
            </Link>
          </div>
          <h3>Past Recordings</h3>
          {allRecording.map(recording => (
            <div className="campus card" key={recording.id}>
              <div className="card-body">
                <Link to={`/recordings/${recording.id}`}>
                  <h3 className="details">{recording.grade}</h3>
                  <h3 className="details">
                    {' '}
                    Date created: {formattedDate(recording.createdAt)}{' '}
                  </h3>
                  <h3 className="details">
                    Preview: {this.previewTranscript(recording.transcript)}
                  </h3>
                  <h3 className="details">See Results</h3>
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
