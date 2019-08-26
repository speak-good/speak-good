import React from 'react'
import {Link} from 'react-router-dom'

const Content = () => {
  return (
    <div>
      <section id="carousel">
        <div id="top-text">
          <h1>Practice makes perfect</h1>
          <h2>Learn More</h2>
        </div>
        <img className="top-image" src="images/banner-woman.png" />
      </section>
      <section id="about">
        <h2>About</h2>
        <div className="flex">
          <p>
            Speaking effectively is an invaluable skill that we all want to
            improve upon.<br />We believe that practice makes perfect! <br />SpeakGood
            is a platform for those who want to record and improve their public
            speaking and interview skills.
          </p>
          <div id="aboutimg">
            <img src="images/interview.png" alt="interview" />
          </div>
        </div>
      </section>
      <section id="power">
        <h2>Unleash Your Power</h2>
        <div className="flex">
          <div id="aboutimg">
            <img src="images/powerpose.png" alt="interview" />
          </div>
          <p>
            Studies show that power poses can instantaneously give you a boost
            in confidence and mood. <br /> Use our power pose guide to set those
            hormonal changes in motion and get the confidence you need to ace
            your interview!<br />
            <Link to="/train">
              <button className="vid-button" type="button">
                Start Training
              </button>
            </Link>
          </p>
        </div>
      </section>
      <section id="features">
        <h2>Features</h2>
        <div className="wrap">
          <div className="feature-profile">
            <div className="icon">
              <img src="images/speech.png" alt="interview" />
            </div>
            <h3 className="feature-name">Record Speech</h3>
            <p className="feature-blurb">
              An even-paced, steady speech helps retain your audience as well as
              help you sound more confident. Record your speech so you can
              practice being the best version of your self!
            </p>
          </div>
          <div className="feature-profile">
            <div className="icon">
              <img src="images/posture.png" alt="interview" />
            </div>
            <h3 className="feature-name">Capture Body Language</h3>
            <p className="feature-blurb">
              An upright, confident posture speaks a million words - use our
              Slouch-o-meter to keep track of your body language.
            </p>
          </div>
          <div className="feature-profile">
            <div className="icon">
              <img src="images/analysis.png" alt="interview" />
            </div>
            <h3 className="feature-name">Analyze Speech</h3>
            <p className="feature-blurb">
              {' '}
              We're all guilty of using "like", "so", and other conversational
              filler words. We will keep track of all your speech hesitations so
              you can improve over time!
            </p>
          </div>

          <div className="feature-profile">
            <div className="icon">
              <img src="images/analysis.png" alt="interview" />
            </div>
            <h3 className="feature-name">Body Language Analysis</h3>
            <p className="feature-blurb">
              Using our state of the art Slouch-o-meter, our algorithms
              calculate how far you are from a confident posture.
            </p>
          </div>
          <div className="feature-profile">
            <div className="icon">
              <img src="images/uptrend.png" alt="interview" />
            </div>
            <h3 className="feature-name">Track Improvement</h3>
            <p className="feature-blurb">
              All your past recordings are available at your disposal. Revisit a
              past recording to see your progress!
            </p>
          </div>
          <div className="feature-profile">
            <div className="icon">
              <img src="images/thumbs.png" alt="interview" />
            </div>
            <h3 className="feature-name">Get Feedback</h3>
            <p className="feature-blurb">
              Coming soon! Reach out to our team of experts to give you
              one-on-one coaching.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Content
