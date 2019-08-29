/* eslint-disable radix */
import React from 'react'
import CountdownTimer from './CountdownTimer'
import Camera from './Camera'
import {connect} from 'react-redux'
import store from '../store'
import {reset} from '../store/trainer'
import ResultPage from './ResultPage'
import {poses} from './training'

class TrainingSinglePose extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stopTraining: false,
      loadCamera: false
    }
    this.displayCamera = this.displayCamera.bind(this)
  }

  componentDidMount() {
    store.dispatch(reset())
    setTimeout(this.displayCamera, 10000)
  }

  displayCamera() {
    this.setState({loadCamera: true})
  }

  render() {
    let poseUrl = poses.filter(pose => {
      if (pose.name === this.props.match.params.poseName) {
        return pose
      }
    })
    return (
      <div>
        {!this.props.stop ? (
          <div>
            {!this.state.loadCamera ? (
              <div id="countdownDiv">
                <h1>
                  Get ready to power up in <CountdownTimer /> seconds{' '}
                </h1>
                <br />
              </div>
            ) : (
              <div className="powerCamDiv">
                <br />
                <h1>
                  Hold the power pose for <CountdownTimer /> seconds
                </h1>
                <br />
                <div className="pose">
                  <img src={poseUrl[0].imageUrl} className="referImg" />
                  <Camera poseName={this.props.match.params.poseName} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="powerCamDiv">
            {this.props.pose === 'BadPose' ? (
              <h1>It's okay! Just keep practicing!</h1>
            ) : (
              <h1>You mastered the power pose!</h1>
            )}

            {this.props.score > 0 && this.props.score <= 1 ? (
              <div>
                <div>
                  <p>Score : {parseInt((1 - this.props.score) * 100)}%</p>
                </div>
                <div>
                  <ResultPage
                    percentage={parseInt((1 - this.props.score) * 100)}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <p>Score : 0</p>
                </div>
                <div>
                  <ResultPage percentage={0} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  pose: state.resultReducer.pose,
  score: state.resultReducer.score,
  stop: state.resultReducer.stop
})

export default connect(mapState)(TrainingSinglePose)
