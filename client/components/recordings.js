import React from 'react'
import {fetchRecordings} from '../store/recordings'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
//import firebaseConfig from '../../secrets'
//import firebase from 'firebase'

export class Recordings extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     audio: ''
  //   }
  //   this.getAudioFromFirebase = this.getAudioFromFirebase.bind(this)
  // }

  // getAudioFromFirebase = audioPathArray => {
  //   firebase.initializeApp(firebaseConfig)
  //   const storageRef = firebase.storage().ref()
  //   console.log('storageRef', storageRef)
  //   const audioRef = storageRef.child(audioPathArray)
  //   console.log('audioRef', audioRef)
  //   audioRef.getDownloadURL().then(url => {
  //     // console.log("url", url)
  //     this.setState({audio: url})
  //     //console.log('state',this.state)
  //   })
  //   //console.log('state', this.state.audio)
  // }

  componentDidMount() {
    this.props.fetchRecordings()
    // this.getAudioFromFirebase('/examples/exampleVid.webm')
  }

  render() {
    const {allRecording} = this.props.recordings
    return (
      <div id="recordingList">
        {/* <video controls src={this.state.audio} />
        {console.log(this.state.audio)} */}
        {allRecording.map(recording => (
          <div className="campus card" key={recording.id}>
            <div className="card-body">
              <Link to={`/recordings/${recording.id}`}>
                <h3 className="campusName">Video #{recording.id}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Recordings)
