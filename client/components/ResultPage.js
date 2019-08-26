import React from 'react'
import {Link} from 'react-router-dom'

// eslint-disable-next-line react/display-name
export default function(props) {
  let percentage = props.percentage
  function refreshPage() {
    window.location.reload()
  }
  return (
    <div id="powerresults">
      <div id="powerresultsContent">
        {percentage > 70 ? (
          <div>
            <h4>Congratulations</h4>
            <img
              className="resultImage"
              src="https://media.giphy.com/media/jQWUkD7a4AWfkraBJa/giphy.gif"
            />
          </div>
        ) : 40 < percentage && percentage < 69 ? (
          <div>
            <h4>Almost there!</h4>
            <img
              className="resultImage"
              src="https://media.giphy.com/media/hV0pccEE0jLfelZPCC/giphy.gif"
            />
          </div>
        ) : (
          <div>
            <h4>Keep Trying!</h4>
            <img
              className="resultImage"
              src="https://media.giphy.com/media/hV0pccEE0jLfelZPCC/giphy.gif"
            />
          </div>
        )}
      </div>

      <div>
        <button className="vid-button" type="button" onClick={refreshPage}>
          {' '}
          <span>Try Again</span>{' '}
        </button>
        <Link to="/">
          <button className="vid-button" type="button">
            Back to homepage
          </button>
        </Link>
        <br />
        <br />
      </div>
    </div>
  )
}
