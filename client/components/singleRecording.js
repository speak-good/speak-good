import React from 'react'
import firebaseConfig from '../../secrets'
import firebase from 'firebase'
import {fetchSingleRecording} from '../store/recordings'
import {connect} from 'react-redux'

export class SingleRecording extends React.Component {
  constructor() {
    super()
    this.state = {
      video: ''
    }
    this.getVideoFromFirebase = this.getVideoFromFirebase.bind(this)
    this.initializeFirebase = this.initializeFirebase.bind(this)
  }

  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig)
  }

  getVideoFromFirebase = audioPathArray => {
    const storageRef = firebase.storage().ref()
    console.log('storageRef', storageRef)
    const audioRef = storageRef.child(audioPathArray)
    // console.log('audioRef', audioRef)
    audioRef.getDownloadURL().then(url => {
      this.setState({video: url})
    })
  }

  componentDidMount() {
    this.props.fetchSingleRecording(this.props.match.params.id)
    this.initializeFirebase()
  }

  componentDidUpdate(prevProps) {
    if (this.props.singleRecording !== prevProps.singleRecording) {
      this.getVideoFromFirebase(this.props.singleRecording.video)
    }
  }

  render() {
    let {video} = this.props.singleRecording
    // console.log('singleRecording', this.props.recordings)
    if (!this.props.singleRecording.video) {
      return <div>Loading...</div>
    }
    return (
      <div>
        {/* {this.getVideoFromFirebase(video)} */}
        <video controls src={this.state.video} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    singleRecording: state.recordings.singleRecording
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSingleRecording: function(id) {
      dispatch(fetchSingleRecording(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecording)
