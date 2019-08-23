import React from 'react'

export default class CountdownTimer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secondsLeft: 10
    }
    this.timer = 0
    this.startTimer = this.startTimer.bind(this)
    this.countDown = this.countDown.bind(this)
  }

  componentDidMount() {
    this.startTimer()
  }

  startTimer() {
    if (this.timer == 0 && this.state.secondsLeft > 0) {
      this.timer = setInterval(this.countDown, 1000)
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.secondsLeft - 1
    this.setState({
      secondsLeft: seconds
    })

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer)
    }
  }

  render() {
    return <div className="countdown">{this.state.secondsLeft}</div>
  }
}
