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
  }

  getVideoFromFirebase = audioPathArray => {
    firebase.initializeApp(firebaseConfig)
    const storageRef = firebase.storage().ref()
    console.log('storageRef', storageRef)
    const audioRef = storageRef.child(audioPathArray)
    console.log('audioRef', audioRef)
    audioRef.getDownloadURL().then(url => {
      // console.log("url", url)
      this.setState({video: url})
      //console.log('state',this.state)
    })
    //console.log('state', this.state.audio)
  }

  componentDidMount(props) {
    const {singleRecording} = this.props.recordings
    console.log('singleRecording', singleRecording)
    this.props.fetchSingleRecording(this.props.match.params.id)
    this.getVideoFromFirebase(singleRecording.video)
  }

  render() {
    return (
      <div>
        <video controls src={this.state.video} />
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
    fetchSingleRecording: function(id) {
      dispatch(fetchSingleRecording(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecording)
