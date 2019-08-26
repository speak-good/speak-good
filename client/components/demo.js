import React from 'react'
import {Link} from 'react-router-dom'

const Demo = () => {
  return (
    <div id="demo-container">
      <h1 id="demo-title">How it works</h1>
      <div id="steps">
        <h5>1. Log in or sign up</h5>
        <h5>2. Record your pitch or presentation</h5>
        <h5>3. Get your results!</h5>
      </div>

      <Link to="/signup">
        <button type="button" id="get-started-btn">
          Get Started
        </button>
      </Link>
    </div>
  )
}

export default Demo
