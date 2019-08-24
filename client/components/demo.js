import React from 'react'
import {Link} from 'react-router-dom'

const Demo = () => {
  return (
    <div>
      <h3 id="demo-title">How it works</h3>
      <h5>Log in or sign up</h5>
      <h5>Record your pitch or presentation</h5>
      <h5>Get your results!</h5>
      <Link to="/signup">
        <button type="button">Get Started</button>
      </Link>
    </div>
  )
}

export default Demo
