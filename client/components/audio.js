import React from 'react'
import firebaseConfig from '../../secrets'
import firebase from 'firebase'
import {fetchAudio} from '../store/audio'
import {connect} from 'react-redux'
//import firebase from 'firebase'

export class Audio extends React.Component {
  constructor() {
    super()
    this.state = {
      audio: ''
    }
    this.getAudioFromFirebase = this.getAudioFromFirebase.bind(this)
  }

  getAudioFromFirebase = audioPathArray => {
    firebase.initializeApp(firebaseConfig)
    const storageRef = firebase.storage().ref()
    console.log('storageRef', storageRef)
    const audioRef = storageRef.child(audioPathArray)
    console.log('audioRef', audioRef)
    audioRef.getDownloadURL().then(url => {
      // console.log("url", url)
      this.setState({audio: url})
      //console.log('state',this.state)
    })
    //console.log('state', this.state.audio)
  }

  componentDidMount() {
    this.props.fetchAudio()
    this.getAudioFromFirebase('/examples/alien.mp3')
  }

  render() {
    return (
      <div>
        <audio controls src={this.state.audio} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    audio: state.audio
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAudio: function() {
      dispatch(fetchAudio())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio)
