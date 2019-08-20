import React from 'react'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'

var recorder

export class Record extends React.Component {
  constructor() {
    super()
    this.startRecording = this.startRecording.bind(this)
    this.realStopRecording = this.realStopRecording.bind(this)
  }
  // componentDidMount() {
  // }

  startRecording = () => {
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

    var video = this.refs.vidRef
    var stop = this.refs.stop

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
      })
      .catch(function(error) {
        console.error('Cannot access media devices: ', error)
      })

    // false
  }

  realStopRecording = () => {
    recorder
      .stopRecording()
      .then(async function() {
        console.info('stopRecording success')

        // Retrieve recorded video as blob and display in the preview element
        let videoBlob = await recorder.getBlob()
        // video.src = URL.createObjectURL(videoBlob)

        var xhr = new XMLHttpRequest()
        xhr.onload = function(e) {
          if (this.readyState === 4) {
            console.log('Server returned: ', e.target.responseText)
          }
        }
        var fd = new FormData()
        fd.append('audio_data', videoBlob, 'videoBlob.wav')

        let newFile = fd.get('audio_data')
        // invokeSaveAsDialog(newFile)

        recorder.stream.stop()
      })
      .catch(function(error) {
        console.error('stopRecording failure', error)
      })
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
