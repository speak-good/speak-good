import React from 'react'
import firebaseConfig from '../../secrets'
import firebase from 'firebase'

//import firebase from 'firebase'

export default class Audio extends React.Component {
  constructor() {
    super()
    this.state = {
      audio: ''
    }
  }
  componentDidMount() {
    firebase.initializeApp(firebaseConfig)
    const storageRef = firebase.storage().ref()
    console.log('storageRef', storageRef)
    const audioRef = storageRef.child('/examples/alien.mov')
    console.log('audioRef', audioRef)
    audioRef.getDownloadURL().then(url => {
      // console.log("url", url)
      this.setState({audio: url})
      //console.log('state',this.state)
    })
    //console.log('state', this.state.audio)
  }

  render() {
    return (
      <div>
        <audio controls src={this.state.audio} />
      </div>
    )
  }
}
