import React from 'react'
import firebaseConfig from '../../secrets'
import firebase from 'firebase'

//import firebase from 'firebase'
firebase.initializeApp(firebaseConfig)

export default class Audio extends React.Component {
  constructor() {
    super()
    this.state = {
      audio: ''
    }
  }
  componentDidMount() {
    const storageRef = firebase.storage().ref()
    const audioRef = storageRef.child('examples/ex.m4a')
    audioRef.getDownloadUrl().then(url => {
      this.setState({audio: url})
    })
  }

  render() {
    return (
      <div>
        <audio controls>
          <source src={this.state.audio} type="audio/x-m4a" />
        </audio>
      </div>
    )
  }
}
