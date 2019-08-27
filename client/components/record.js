import React from 'react'
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import firebaseConfig from '../../secrets'
import {addNewRecording, fetchRecordings} from '../store/recordings'
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
  just: true,
  Just: true,
  Maybe: true,
  maybe: true,
  So: true,
  so: true,
  Well: true,
  well: true,
  seriously: true,
  Seriously: true,
  Probably: true,
  probably: true,
  Anyways: true,
  anyways: true,
  sorry: true,
  Sorry: true,
  Cuz: true,
  cuz: true,
  But: true,
  but: true,
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
  'I suppose': true,
  'You know': true,
  'you know': true,
  'You see': true,
  'you see': true,
  'And also': true,
  'and also': true,
  'Or something': true,
  'or something': true,
  'Kind of': true,
  'kind of': true,
  'Sort of': true,
  'sort of': true
}

const longFillerPhrases = {
  'I don’t know': true,
  'Stuff like that': true,
  'stuff like that': true,
  'I think that': true,
  'I feel like': true
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
      grade: '',
      linkOut: false,
      save: false,
      started: false
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
    this.props.fetchRecordings()
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
      this.setState({
        linkOut: false,
        save: false,
        started: true
      })
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
      this.setState({
        started: false
      })
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
      for (let i = 0; i < transcriptArr.length; i++) {
        let currPhrase =
          transcriptArr[i] +
          ' ' +
          transcriptArr[i + 1] +
          ' ' +
          transcriptArr[i + 2]
        console.log(currPhrase)
        if (longFillerPhrases[currPhrase]) {
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
            grade: myGrade,
            linkOut: true
          })
          //this is where *we think* we will pass our 'videoBlob' up to Firebase Storage somehow, to then get a "link", to then store in our database
          // console.log("this", this)
          // that.putVideoInFirebase(videoBlob)
          // --> command to download as a file
          // invokeSaveAsDialog(videoBlob)

          recorder.stream.stop()
          let track = recorder.stream.getTracks()[0]
          track.stop()
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
        grade: '',
        linkOut: false
      })

      recorder.reset()
    }

    const saveRecording = () => {
      this.setState({save: true})
      this.putVideoInFirebase(this.state.videoBlob)
    }
    const allRecording = this.props.allRecording
    return (
      <div id="record-page">
        <br />
        <br />
        <br />
        <br />
        <h2 id="ready-set-action">Ready, Set, Action!</h2>
        <div id="red-button-container">
          {this.state.started ? (
            <img
              id="record-button-action"
              src="https://icon-library.net/images/record-button-icon/record-button-icon-16.jpg"
            />
          ) : (
            ''
          )}
        </div>
        <div id="recording-container">
          <div>
            <video id="vidRef" ref="vidRef" controls autoPlay />
          </div>
          <div id="button-container">
            {this.state.videoBlob ? (
              <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            ) : (
              <div>
                <div id="flex">
                  <button
                    disabled={this.state.started}
                    className="vid-button"
                    onClick={startRecording}
                  >
                    Start Recording
                  </button>
                  <button
                    disabled={!this.state.started}
                    id="stop"
                    className="vid-button"
                    ref="stop"
                    onClick={realStopRecording}
                  >
                    Stop Recording
                  </button>
                </div>
              </div>
            )}
            {this.state.linkOut ? (
              <div>
                <div id="center">
                  <button
                    id="middle"
                    className="vid-button"
                    ref="reset"
                    onClick={() => resetRecording()}
                  >
                    Reset Recording
                  </button>
                  <button
                    id="middle-opposite"
                    className="vid-button"
                    ref="save"
                    onClick={() => saveRecording()}
                  >
                    Save Recording
                  </button>
                </div>

                {this.state.save && allRecording.length ? (
                  <div>
                    <Link
                      to={`/recordings/${
                        allRecording[allRecording.length - 1].id
                      }`}
                    >
                      <button id="results" className="vid-button">
                        View Your Results
                      </button>
                    </Link>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    defaultUser: state.user,
    allRecording: state.recordings.allRecording
  }
}

function mapDispatchToProps(dispatch) {
  return {
    me: function() {
      dispatch(me())
    },
    addNewRecording: function(recording) {
      dispatch(addNewRecording(recording))
    },
    fetchRecordings: function() {
      dispatch(fetchRecordings())
    }
  }
}

Record.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(
  SpeechRecognition(options)(Record)
)
