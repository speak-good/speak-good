import React from 'react'
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import firebaseConfig from '../../secrets'
import {addNewRecording} from '../store/recordings'
import {me} from '../store/user'
import {connect} from 'react-redux'

const propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func
}

const options = {
  autoStart: false
}

const fillerWords = {
  like: true,
  Like: true,
  ok: true,
  OK: true,
  Ok: true,
  Okay: true,
  okay: true,
  So: true,
  so: true,
  Well: true,
  well: true,
  Totally: true,
  totally: true,
  Basically: true,
  basically: true,
  Literally: true,
  literally: true,
  Actually: true,
  actually: true,
  Really: true,
  really: true,
  Stuff: true,
  stuff: true,
  Whatever: true,
  whatever: true
}

const fillerPhrases = {
  'I mean': true,
  'I guess': true,
  'You know': true,
  'you know': true,
  'You see': true,
  'you see': true,
  'Or something': true,
  'or something': true,
  'Kind of': true,
  'kind of': true,
  'Sort of': true,
  'sort of': true
}

let recorder

export class Record extends React.Component {
  constructor() {
    super()
    this.state = {
      videoBlob: '',
      slouch: 0,
      transcript: '',
      fillerCount: 0,
      grade: ''
    }
    this.putVideoInFirebase = this.putVideoInFirebase.bind(this)
    this.initializeFirebase = this.initializeFirebase.bind(this)
  }

  initializeFirebase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
  }

  componentDidMount() {
    this.initializeFirebase()
  }

  putVideoInFirebase = video => {
    let storageRef = firebase.storage().ref()
    let date = Date.now()
    let videoRef = storageRef.child(`${date}.webm`)
    let videoWebmRef = storageRef.child(
      `${this.props.defaultUser.id}/${date}.webm`
    )
    console.log('videoWebmRef', videoWebmRef)
    let file = video
    videoWebmRef.put(file).then(function(snapshot) {
      console.log('Uploaded blob or file!')
    })
    this.props.addNewRecording({
      video: videoWebmRef.fullPath,
      slouch: this.state.slouch,
      transcript: this.state.transcript,
      fillerCount: this.state.fillerCount,
      grade: this.state.grade
    })
    console.log('videoWebmReb.fullPath type:', typeof videoWebmRef.fullPath)
  }

  render() {
    if (!this.props.defaultUser.id) {
      return <div>Loading...</div>
    }
    const {
      transcript,
      resetTranscript,
      abortListening,
      startListening
    } = this.props
    const startRecording = () => {
      this.props.resetTranscript()
      this.props.startListening()
      let isMimeTypeSupported = _mimeType => {
        if (typeof MediaRecorder.isTypeSupported !== 'function') {
          return true
        }
        return MediaRecorder.isTypeSupported(_mimeType)
      }
      let mimeType = 'audio/mpeg'
      if (isMimeTypeSupported(mimeType) === false) {
        console.log(mimeType, 'is not supported.')
        mimeType = 'audio/ogg'

        if (isMimeTypeSupported(mimeType) === false) {
          console.log(mimeType, 'is not supported.')
          mimeType = 'audio/webm'

          if (isMimeTypeSupported(mimeType) === false) {
            console.log(mimeType, 'is not supported.')

            mimeType = 'audio/wav'
          }
        }
      }
      const rtcSession = {
        mimeType: mimeType,
        audio: true,
        video: true
      }

      let video = this.refs.vidRef

      navigator.mediaDevices
        .getUserMedia(rtcSession)
        .then(function(stream) {
          setSrcObject(stream, video)
          video.play()
          video.muted = true

          recorder = new RecordRTCPromisesHandler(stream, rtcSession)

          recorder
            .startRecording()
            .then(function() {
              console.info('Recording video ...')
            })
            .catch(function(error) {
              console.error('Cannot start video recording: ', error)
            })

          recorder.stream = stream
        })
        .catch(function(error) {
          console.error('Cannot access media devices: ', error)
        })
    }

    const realStopRecording = () => {
      let that = this
      this.props.abortListening()
      this.props.stopListening()
      let count = 0
      let fillerWordsUsed = []
      let realTranscript = this.props.transcript
      let transcriptArr = realTranscript.split(' ')
      transcriptArr.forEach(function(word) {
        if (fillerWords[word]) {
          count++
          fillerWordsUsed.push(word)
        }
      })
      for (let i = 0; i < transcriptArr.length; i++) {
        let currPhrase = transcriptArr[i] + ' ' + transcriptArr[i + 1]
        if (fillerPhrases[currPhrase]) {
          count++
          fillerWordsUsed.push(currPhrase)
        }
      }

      console.log('NOT FILTERED TRANSCRIPT: ', this.props.transcript)
      console.log('FILLER WORD COUNT: ', count)
      console.log('FILLER WORDS USED: ', fillerWordsUsed)
      this.props.resetTranscript()

      recorder
        .stopRecording()
        .then(async function() {
          console.info('stopRecording success')
          let videoBlob = await recorder.getBlob()
          const gradeCalc = count => {
            if (count <= 3) return 'A'
            if (count > 3 && count <= 6) return 'B'
            if (count > 6 && count <= 10) return 'C'
            if (count > 10 && count <= 15) return 'D'
            else return 'F'
          }
          let myGrade = gradeCalc(count)
          that.setState({
            videoBlob,
            slouch: 0,
            transcript: realTranscript,
            fillerCount: count,
            grade: myGrade
          })
          //this is where *we think* we will pass our 'videoBlob' up to Firebase Storage somehow, to then get a "link", to then store in our database
          // console.log("this", this)
          // that.putVideoInFirebase(videoBlob)
          // --> command to download as a file
          // invokeSaveAsDialog(videoBlob)

          recorder.stream.stop()
        })
        .catch(function(error) {
          console.error('stopRecording failure', error)
        })
    }

    const resetRecording = () => {
      let that = this
      this.props.abortListening()
      this.props.stopListening()
      let count = 0
      let fillerWordsUsed = []
      let realTranscript = this.props.transcript
      let transcriptArr = realTranscript.split(' ')

      let transcript = this.props.transcript

      this.props.resetTranscript()

      this.setState({
        videoBlob: '',
        slouch: 0,
        transcript: '',
        fillerCount: 0,
        grade: ''
      })

      recorder.reset()
    }

    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>Recording Page</h3>
        <video id="vidRef" ref="vidRef" controls autoPlay />
        <br />
        <button id="btn-start-recording" onClick={startRecording}>
          Start Recording
        </button>
        <button id="stop" ref="stop" onClick={realStopRecording}>
          Stop Recording
        </button>
        <button id="reset" ref="reset" onClick={() => resetRecording()}>
          Reset
        </button>
        <button
          id="save"
          ref="save"
          onClick={() => this.putVideoInFirebase(this.state.videoBlob)}
        >
          SAVE Recording
        </button>
        <Link to="/recordings">
          <h3>My Recordings</h3>
        </Link>
        <button
          id="btn-view-results"
          onClick={() => invokeSaveAsDialog(this.state.videoBlob)}
        >
          Download
        </button>
        <hr />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    defaultUser: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    me: function() {
      dispatch(me())
    },
    addNewRecording: function(recording) {
      dispatch(addNewRecording(recording))
    }
  }
}

Record.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(
  SpeechRecognition(options)(Record)
)
