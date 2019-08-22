import React from 'react'
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'
import {connect} from 'react-redux'

const propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func
  // browserSupportsSpeechRecognition: PropTypes.bool
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

var recorder

export class Record extends React.Component {
  constructor() {
    super()
  }

  // startListening = this.props.startListening
  // abortListening = this.props.abortListening
  // transcript = this.props.transcript
  // resetTranscript = this.props.transcript

  // const Record = ({
  //   transcript,
  //   resetTranscript,
  //   abortListening,
  //   startListening,
  //   browserSupportsSpeechRecognition
  // }) => {
  //   if (!browserSupportsSpeechRecognition) {
  //     return null
  //   }

  startRecording = () => {
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
          // recorderType = MediaStreamRecorder
        }
      }
    }
    const rtcSession = {
      // type: 'video',
      mimeType: mimeType,
      audio: true,
      video: true
      // recorderType: StereoVideoRecorder
    }

    ///////////////////////
    var video = this.refs.vidRef
    ///////////////////////

    navigator.mediaDevices
      .getUserMedia(rtcSession)
      .then(function(stream) {
        ///////////////////////
        // Display a live preview on the video element of the page
        setSrcObject(stream, video)
        // Start to display the preview on the video element
        // and mute the video to disable the echo issue !
        video.play()
        video.muted = true
        ///////////////////////

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

  realStopRecording = () => {
    console.log(this.props.transcript)
    this.props.abortListening()
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

        //this is where *we think* we will pass our 'videoBlob' up to Firebase Storage somehow, to then get a "link", to then store in our database

        // --> command to download as a file
        invokeSaveAsDialog(videoBlob)

        recorder.stream.stop()
      })
      .catch(function(error) {
        console.error('stopRecording failure', error)
      })
  }
  render() {
    // console.log(this.props)
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
        <button id="btn-start-recording" onClick={this.startRecording}>
          Start Recording
        </button>
        <button
          id="stop"
          ref="stop"
          onClick={this.realStopRecording}
          // disabled="disabled"
        >
          Stop Recording
        </button>
        <hr />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    // methods: state.audio.methods
    transcript: state.audio.methods.transcript,
    resetTranscript: () => state.audio.methods.resetTranscript,
    abortListening: () => state.audio.methods.abortListening,
    startListening: () => state.audio.methods.startListening
    // browserSupportsSpeechRecognition: state.methods.browserSupportsSpeechRecognition
  }
}

Record.propTypes = propTypes

export default connect(mapStateToProps, null)(Record)

// export default SpeechRecognition(options)(Record)
