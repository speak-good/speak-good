/* eslint-disable complexity */
import React from 'react'
import firebaseConfig from '../../secrets'
import firebase from 'firebase'
import {fetchSingleRecording} from '../store/recordings'
import {connect} from 'react-redux'

const fillerWords = {
  like: true,
  Like: true,
  ok: true,
  OK: true,
  Ok: true,
  Okay: true,
  okay: true,
  So: true,
  so: true,
  Well: true,
  well: true,
  Totally: true,
  totally: true,
  Basically: true,
  basically: true,
  Literally: true,
  literally: true,
  Actually: true,
  actually: true,
  Really: true,
  really: true,
  Stuff: true,
  stuff: true,
  Whatever: true,
  whatever: true,
  Just: true,
  just: true,
  Maybe: true,
  maybe: true,
  Seriously: true,
  seriously: true,
  Probably: true,
  probably: true,
  Anyways: true,
  anyways: true,
  Sorry: true,
  sorry: true,
  Look: true,
  look: true,
  Cuz: true,
  cuz: true,
  But: true,
  but: true
}

const fillerPhrases = {
  'I mean': true,
  'I guess': true,
  'You know': true,
  'you know': true,
  'You see': true,
  'you see': true,
  'Or something': true,
  'or something': true,
  'Kind of': true,
  'kind of': true,
  'Sort of': true,
  'sort of': true
}

const longFillerPhrases = {
  'I don’t know': true,
  'Stuff like that': true,
  'stuff like that': true,
  'I think that': true,
  'I feel like': true
}

export class SingleRecording extends React.Component {
  constructor() {
    super()
    this.state = {
      video: ''
      // videoId: this.props.match.params.id
    }
    this.getVideoFromFirebase = this.getVideoFromFirebase.bind(this)
    this.initializeFirebase = this.initializeFirebase.bind(this)
  }

  initializeFirebase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
  }

  getVideoFromFirebase = audioPathArray => {
    const storageRef = firebase.storage().ref()
    console.log('storageRef', storageRef)
    const audioRef = storageRef.child(audioPathArray)
    console.log('audioRef', audioRef)
    audioRef.getDownloadURL().then(url => {
      this.setState({video: url})
    })
  }

  componentDidMount() {
    this.props.fetchSingleRecording(this.props.match.params.id)
    this.initializeFirebase()
  }

  componentDidUpdate(prevProps) {
    if (this.props.singleRecording !== prevProps.singleRecording) {
      this.getVideoFromFirebase(this.props.singleRecording.video)
    }
  }

  render() {
    console.log(this.props)
    const {
      video,
      fillerCount,
      slouch,
      transcript,
      grade,
      createdAt
    } = this.props.singleRecording
    if (!this.props.singleRecording.video) {
      return <div>Loading...</div>
    }

    let months = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    }

    let formattedDate = unformattedDate => {
      let year = unformattedDate.slice(0, 4)
      let month = unformattedDate.slice(5, 7)
      let day = unformattedDate.slice(8, 10)
      return months[month] + ' ' + day + ', ' + year
    }

    let fillerWordsUsed = transcriptToCount => {
      let wordsUsed = []
      let countOfWords = {}
      let transcriptArr = transcriptToCount.split(' ')
      for (let i = 0; i < transcriptArr.length; i++) {
        let twoWordPhrase = transcriptArr[i] + ' ' + transcriptArr[i + 1]
        let threeWordPhrase =
          transcriptArr[i] +
          ' ' +
          transcriptArr[i + 1] +
          ' ' +
          transcriptArr[i + 2]
        let oneWord = transcriptArr[i]
        if (longFillerPhrases[threeWordPhrase]) {
          wordsUsed.push(threeWordPhrase)
          i += 2
          if (threeWordPhrase in countOfWords) {
            countOfWords[threeWordPhrase]++
          } else {
            countOfWords[threeWordPhrase] = 1
          }
        } else if (fillerPhrases[twoWordPhrase]) {
          wordsUsed.push(twoWordPhrase)
          i++
          if (twoWordPhrase in countOfWords) {
            countOfWords[twoWordPhrase]++
          } else {
            countOfWords[twoWordPhrase] = 1
          }
        } else if (fillerWords[oneWord]) {
          wordsUsed.push(oneWord)
          if (oneWord in countOfWords) {
            countOfWords[oneWord]++
          } else {
            countOfWords[oneWord] = 1
          }
        }
      }
      // wordsUsed.sort()
      // let sorted = []
      // for (let i = 0; i < wordsUsed.length; i++) {
      //   if (wordsUsed[i] !== wordsUsed[i + 1]) {
      //     sorted.push(wordsUsed[i])
      //   }
      // }
      return countOfWords
    }

    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div id="bigger-results-container">
          <h2>Your Results:</h2>
          <div id="results-container">
            <div>
              <video controls src={this.state.video} />
            </div>
            <div id="results-metrics">
              <p>
                <span className="bold">Date:</span> {formattedDate(createdAt)}
              </p>
              <p>
                <span className="bold">Grade:</span> {grade}
              </p>
              <p>
                <span className="bold">Filler Word Count:</span> {fillerCount}
              </p>
              <p>
                <span className="bold">Transcript:</span>
                <span> " </span>
                {transcript.length === 0
                  ? ' None'
                  : transcript
                      .split(' ')
                      .map(
                        (word, index, arr) =>
                          fillerWords[word] ||
                          fillerPhrases[word + ' ' + arr[index + 1]] ||
                          fillerPhrases[arr[index - 1] + ' ' + word] ||
                          longFillerPhrases[
                            word + ' ' + arr[index + 1] + ' ' + arr[index + 2]
                          ] ||
                          longFillerPhrases[
                            arr[index - 1] + ' ' + word + ' ' + arr[index + 1]
                          ] ||
                          longFillerPhrases[
                            arr[index - 2] + ' ' + arr[index - 1] + ' ' + word
                          ] ? (
                            <span className="highlight">{`${word} `}</span>
                          ) : (
                            <span>{`${word} `}</span>
                          )
                      )}
                <span>."</span>
              </p>
              <p>
                <span className="bold">Filler Words Used:</span>
                {Object.keys(fillerWordsUsed(transcript)).length === 0 ? (
                  ' None'
                ) : (
                  <ul>
                    {Object.keys(fillerWordsUsed(transcript)).map(word => (
                      <li>
                        {word}: {fillerWordsUsed(transcript)[word]}
                      </li>
                    ))}
                  </ul>
                )}
              </p>
              {/* <p>Slouch Percentage: {slouch}%</p> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    singleRecording: state.recordings.singleRecording
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSingleRecording: function(id) {
      dispatch(fetchSingleRecording(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecording)
