import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class Record extends React.Component {
  constructor() {
    super()
    // this.state = defaultState
    this.startRecording = this.startRecording.bind(this)
    this.stopRecording = this.stopRecording.bind(this)
    // this.getVideo = this.getVideo.bind(this)
  }
  // componentDidMount() {
  //   this.props.getCartThunk()
  // }

  // getVideo = el => {
  //   this.video = el
  // }

  startRecording = () => {
    let recordRTC = null
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
          recorderType = StereoAudioRecorder
        }
      }
    }
    const rtcSession = {
      type: 'audio',
      mimeType: mimeType,
      audio: true,
      video: false,
      recorderType: StereoAudioRecorder
    }

    // let video = this.getVideo
    var video = this.refs.vidRef
    // let video = this.video
    console.log(video)

    var recorder

    // Disable start recording button
    this.disabled = true

    // Request access to the media devices
    navigator.mediaDevices
      .getUserMedia(rtcSession)
      .then(function(stream) {
        // Display a live preview on the video element of the page

        setSrcObject(stream, video)

        // Start to display the preview on the video element
        // and mute the video to disable the echo issue !

        video.play()
        video.muted = true

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

        // Enable stop recording button
        document.getElementById('btn-stop-recording').disabled = false
      })
      .catch(function(error) {
        console.error('Cannot access media devices: ', error)
      })

    // false
  }

  render() {
    return (
      <div>
        <h3>Recording Page</h3>
        <video id="vidRef" ref="vidRef" controls autoPlay />
        <button id="btn-start-recording" onClick={this.startRecording}>
          Start Recording
        </button>
        <button
          id="btn-stop-recording"
          onClick={this.stopRecording}
          disabled="disabled"
        >
          Stop Recording
        </button>
        <hr />
      </div>
    )
  }
}
// function mapStateToProps(state) {
//   return {
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return {
//   }
// }
// export default connect(null, null)(Record)

export default Record
