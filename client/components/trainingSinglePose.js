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
    setTimeout(this.displayCamera, 9000)
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
    console.log(poseUrl)
    // eslint-disable-next-line no-return-assign
    return (
      <div>
        {!this.props.stop ? (
          <div>
            {!this.state.loadCamera ? (
              <div className="countdownDiv">
                <div>
                  <h1>You are large and in charge!</h1>
                  <br />
                  <CountdownTimer />
                </div>
              </div>
            ) : (
              <div className="cameraDiv">
                {/* {(stop = null)} */}
                <br />
                <h1>Hold the power pose!</h1>
                <br />
                <CountdownTimer />
                <div className="row">
                  <div className="col col-lg-4">
                    <img src={poseUrl[0].imageUrl} className="referImg" />
                  </div>
                  <div className="col col-lg-8">
                    <Camera poseName={this.props.match.params.poseName} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <br />
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
