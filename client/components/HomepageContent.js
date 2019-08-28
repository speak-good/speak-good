import React from 'react'
import {Link} from 'react-router-dom'

const Content = () => {
  return (
    <div>
      <section id="carousel">
        <div id="top-text">
          <h1>Practice makes perfect</h1>
          <a href="#about">
            <h2>Learn More</h2>
          </a>
        </div>
        <img className="top-image" src="https://i.imgur.com/YH6KQT3.png" />
      </section>
      <section id="about">
        <h2>About</h2>
        <div className="flex">
          <p>
            Speaking effectively is an invaluable skill that we all want to
            improve upon. We believe that practice makes perfect! <br />SpeakGood
            is a platform for those who want to record and improve their public
            speaking and interview skills.<br />
            <br />
            Scroll down to learn more ⬇️
          </p>
          <div id="aboutimg">
            <img src="images/interview.png" alt="interview" />
          </div>
        </div>
      </section>
      <section id="power">
        <h2>Unleash Your Power</h2>
        <div className="flex">
          <div id="powerimg">
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
      <section id="about">
        <h2>Track Filler Words</h2>
        <div className="flex">
          <p>
            Get a transcription of your pitch, word-for-word. Index and
            reference interview sections quickly, and make improvements to your
            speech in no time! Use our state of the art algorithms to help you
            keep track of your most frequestly used filler words and improve
            your performance as a public speaker.<br />
            <Link to="/signup">
              <button className="vid-button" type="button">
                Get Started
              </button>
            </Link>
          </p>
          <div id="aboutimg">
            <img src="https://i.imgur.com/zrM0kWK.gif" alt="interview" />
          </div>
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
              practice being the best version of your self.
            </p>
          </div>
          <div className="feature-profile">
            <div className="icon">
              <img src="https://i.imgur.com/9m3uEkQ.png" alt="interview" />
            </div>
            <h3 className="feature-name">Analyze Speech</h3>
            <p className="feature-blurb">
              {' '}
              We're all guilty of using "like", "so", and other conversational
              filler words. After your recording, we'll provide you a grade
              indicating how well you've performed!
            </p>
          </div>
          <div className="feature-profile">
            <div className="icon">
              <img src="https://i.imgur.com/p6iCWMl.png" alt="interview" />
            </div>
            <h3 className="feature-name">Boost Your Confidence</h3>
            <p className="feature-blurb">
              Nothing like a good power pose to set the tone for your next
              interview - use our Power Pose guide to get an instant mood boost!
            </p>
          </div>
          <div className="feature-profile">
            <div className="icon">
              <img src="images/analysis.png" alt="interview" />
            </div>
            <h3 className="feature-name">Body Language Analysis</h3>
            <p className="feature-blurb">
              Coming soon! Using our state of the art Slouch-o-meter, our
              algorithms calculate how far you are from a confident posture.
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
      <div className="footer">
        <div>© 2019 TMJS, Inc.</div>
        <div className="authors">
          <h1 id="with-love">Made with &hearts; by</h1>
          <p>
            Juliana Albano ∙ Morgan Mattone ∙ Sharon Osterbind ∙ Teressa Son
          </p>
        </div>
        <div />
      </div>
    </div>
  )
}

export default Content
