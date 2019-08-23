import React from 'react'
import {Link} from 'react-router-dom'

// eslint-disable-next-line react/display-name
export default function(props) {
  let percentage = props.percentage
  return (
    <div id="results">
      <div id="resultHeading">
        <h1>RESULTS</h1>
      </div>
      <div id="resultsContent">
        {percentage > 70 ? (
          <div>
            <img
              className="resultImage"
              src="https://media.giphy.com/media/1g3BfhRZ0D08yZvUqV/giphy.gif"
            />
            <div className="progress-bar striped animated">
              <span
                className="progress-bar-green"
                style={{width: `${percentage}%`}}
              />
            </div>
            <h4>Congratulations</h4>
          </div>
        ) : 40 < percentage && percentage < 69 ? (
          <div>
            <img
              className="resultImage"
              src="https://media.giphy.com/media/3o7TKsoVuOCiiw7Zx6/giphy.gif"
            />
            <div className="progress-bar striped animated">
              <span
                className="progress-bar-blue"
                style={{width: `${percentage}%`}}
              />
            </div>
            <h4>Keep Practicing!</h4>
          </div>
        ) : (
          <div>
            <img
              className="resultImage"
              src="https://media.giphy.com/media/C1Fdach2R4HSg/giphy.gif"
            />
            <div className="progress-bar striped animated">
              <span
                className="progress-bar-red"
                style={{width: `${percentage}%`}}
              />
            </div>
            <h4>Try Again</h4>
          </div>
        )}
      </div>

      <div>
        <Link to="/">
          <button>Back to homepage</button>
        </Link>
        <br />
        <br />
      </div>
    </div>
  )
}
