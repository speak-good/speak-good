import React from 'react'
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'

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

//   const stop = () => {
//     abortListening()
//     let count = 0
//     let fillerWordsUsed = []
//     let transcriptArr = transcript.split(' ')
//     transcriptArr.forEach(function(word) {
//       if (fillerWords[word]) {
//         count++
//         fillerWordsUsed.push(word)
//       }
//     })
//     for (let i = 0; i < transcriptArr.length; i++) {
//       let currPhrase = transcriptArr[i] + ' ' + transcriptArr[i + 1]
//       if (fillerPhrases[currPhrase]) {
//         count++
//         fillerWordsUsed.push(currPhrase)
//       }
//     }

//     console.log('NOT FILTERED TRANSCRIPT: ', transcript)
//     console.log('FILLER WORD COUNT: ', count)
//     console.log('FILLER WORDS USED: ', fillerWordsUsed)
//     resetTranscript()
//   }

//   return (
//     <div>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <h3>Record and transcribe!</h3>
//       <button type="button" onClick={startListening}>
//         Start
//       </button>
//       <button type="button" onClick={resetTranscript}>
//         Reset
//       </button>
//       <button type="button" onClick={stop}>
//         Stop
//       </button>
//     </div>
//   )
// }

// Record.propTypes = propTypes

//////////////////////////////////////////////////

const propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
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
  Kinda: true,
  kinda: true,
  Sorta: true,
  sorta: true,
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

const Record = ({
  transcript,
  resetTranscript,
  abortListening,
  startListening
  // browserSupportsSpeechRecognition
}) => {
  // if (!browserSupportsSpeechRecognition) {
  //   return null
  // }

  // export class Record extends React.Component {
  //   constructor() {
  //     super()

  //     // this.startRecording = this.startRecording.bind(this)
  //     // this.realStopRecording = this.realStopRecording.bind(this)
  //     // this.transcript = this.transcript.bind(this)
  //     // this.resetTranscript = this.resetTranscript.bind(this)
  //     // this.abortListening = this.abortListening.bind(this)
  //     // this.startListening = this.startListening.bind(this)

  //     // this.record = {
  //     //   transcript,
  //     //   resetTranscript,
  //     //   abortListening,
  //     //   startListening,
  //     // browserSupportsSpeechRecognition
  //     // }
  //   }

  let startRecording = () => {
    startListening()
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

          // fallback to WebAudio solution
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
    // var video = React.forwardRef('vidRef')
    ///////////////////////

    // Request access to the media devices
    navigator.mediaDevices
      .getUserMedia(rtcSession)
      .then(function(stream) {
        // Display a live preview on the video element of the page
        // setSrcObject(stream, video)

        ///////////////////////
        // Start to display the preview on the video element
        // and mute the video to disable the echo issue !
        // video.play()
        // video.muted = true
        ///////////////////////

        // Initialize the recorder
        recorder = new RecordRTCPromisesHandler(stream, rtcSession)

        // Start recording the video
        recorder
          .startRecording()
          .then(function() {
            console.info('Recording video ...')
          })
          .catch(function(error) {
            console.error('Cannot start video recording: ', error)
          })

        // release stream on stopRecording
        recorder.stream = stream
      })
      .catch(function(error) {
        console.error('Cannot access media devices: ', error)
      })
  }

  let realStopRecording = () => {
    abortListening()
    let count = 0
    let fillerWordsUsed = []
    let transcriptArr = transcript.split(' ')
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

    console.log('NOT FILTERED TRANSCRIPT: ', transcript)
    console.log('FILLER WORD COUNT: ', count)
    console.log('FILLER WORDS USED: ', fillerWordsUsed)
    resetTranscript()

    recorder
      .stopRecording()
      .then(async function() {
        console.info('stopRecording success')
        let videoBlob = await recorder.getBlob()

        //this is where we'd pass our 'videoBlob' up to Firebase Storage, to then get a "link", to then store in our database

        // --> command to download as a file
        invokeSaveAsDialog(videoBlob)

        recorder.stream.stop()
      })
      .catch(function(error) {
        console.error('stopRecording failure', error)
      })
  }

  return (
    <div>
      <h3>Recording Page</h3>
      {/* <video id="vidRef" ref="vidRef" controls autoPlay /> */}
      <video id="vidRef" controls autoPlay />
      <button id="btn-start-recording" onClick={startRecording}>
        Start Recording
      </button>
      <button
        id="stop"
        onClick={realStopRecording}
        // disabled="disabled"
      >
        {/* <button
        id="stop"
        ref="stop"
        onClick={realStopRecording}
        // disabled="disabled"
      > */}
        Stop Recording
      </button>
      <hr />
    </div>
  )
}
// function mapStateToProps(state) {
//   return {
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return {
//   }
// }

// export default Record
Record.propTypes = propTypes

export default SpeechRecognition(options)(Record)
