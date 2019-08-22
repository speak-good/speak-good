import React from 'react'
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'

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

const Record = ({
  transcript,
  resetTranscript,
  // stopListening,
  abortListening,
  startListening,
  browserSupportsSpeechRecognition
}) => {
  if (!browserSupportsSpeechRecognition) {
    return null
  }

  const stop = () => {
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
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h3>Record and transcribe!</h3>
      <button type="button" onClick={startListening}>
        Start
      </button>
      <button type="button" onClick={resetTranscript}>
        Reset
      </button>
      <button type="button" onClick={stop}>
        Stop
      </button>
    </div>
  )
}

Record.propTypes = propTypes

export default SpeechRecognition(options)(Record)

// var recorder

// export class Record extends React.Component {
//   constructor() {
//     super()
//     this.startRecording = this.startRecording.bind(this)
//     this.realStopRecording = this.realStopRecording.bind(this)
//   }
//   // componentDidMount() {
//   // }

//   startRecording = () => {
//     let isMimeTypeSupported = _mimeType => {
//       if (typeof MediaRecorder.isTypeSupported !== 'function') {
//         return true
//       }
//       return MediaRecorder.isTypeSupported(_mimeType)
//     }
//     let mimeType = 'audio/mpeg'
//     if (isMimeTypeSupported(mimeType) === false) {
//       console.log(mimeType, 'is not supported.')
//       mimeType = 'audio/ogg'

//       if (isMimeTypeSupported(mimeType) === false) {
//         console.log(mimeType, 'is not supported.')
//         mimeType = 'audio/webm'

//         if (isMimeTypeSupported(mimeType) === false) {
//           console.log(mimeType, 'is not supported.')

//           // fallback to WebAudio solution
//           mimeType = 'audio/wav'
//           recorderType = StereoAudioRecorder
//         }
//       }
//     }
//     const rtcSession = {
//       type: 'audio',
//       mimeType: mimeType,
//       audio: true,
//       video: false,
//       recorderType: StereoAudioRecorder
//     }

//     var video = this.refs.vidRef
//     var stop = this.refs.stop

//     // Request access to the media devices
//     navigator.mediaDevices
//       .getUserMedia(rtcSession)
//       .then(function(stream) {
//         // Display a live preview on the video element of the page
//         setSrcObject(stream, video)

//         // Start to display the preview on the video element
//         // and mute the video to disable the echo issue !
//         video.play()
//         video.muted = true

//         // Initialize the recorder
//         recorder = new RecordRTCPromisesHandler(stream, rtcSession)

//         // Start recording the video
//         recorder
//           .startRecording()
//           .then(function() {
//             console.info('Recording video ...')
//           })
//           .catch(function(error) {
//             console.error('Cannot start video recording: ', error)
//           })

//         // release stream on stopRecording
//         recorder.stream = stream
//       })
//       .catch(function(error) {
//         console.error('Cannot access media devices: ', error)
//       })

//     // false
//   }

//   realStopRecording = () => {
//     recorder
//       .stopRecording()
//       .then(async function() {
//         console.info('stopRecording success')

//         // Retrieve recorded video as blob and display in the preview element
//         let videoBlob = await recorder.getBlob()
//         // video.src = URL.createObjectURL(videoBlob)

//         var xhr = new XMLHttpRequest()
//         xhr.onload = function(e) {
//           if (this.readyState === 4) {
//             console.log('Server returned: ', e.target.responseText)
//           }
//         }
//         var fd = new FormData()
//         fd.append('audio_data', videoBlob, 'videoBlob.wav')

//         let newFile = fd.get('audio_data')
//         // invokeSaveAsDialog(newFile)

//         recorder.stream.stop()
//       })
//       .catch(function(error) {
//         console.error('stopRecording failure', error)
//       })
//   }

//   render() {
//     return (
//       <div>
//         <h3>Recording Page</h3>
//         <video id="vidRef" ref="vidRef" controls autoPlay />
//         <button id="btn-start-recording" onClick={this.startRecording}>
//           Start Recording
//         </button>
//         <button
//           id="stop"
//           ref="stop"
//           onClick={this.realStopRecording}
//           // disabled="disabled"
//         >
//           Stop Recording
//         </button>
//         <hr />
//       </div>
//     )
//   }
// }
// // function mapStateToProps(state) {
// //   return {
// //   }
// // }
// // function mapDispatchToProps(dispatch) {
// //   return {
// //   }
// // }
// // export default connect(null, null)(Record)

// export default Record
