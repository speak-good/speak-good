# SpeakGood

_Speak Good, Feel Great_

SpeakGood is a web-application designed to help users become better public speakers and interviewers at their own convenience. Our web-app allows a user to record a video of themselves and, upon saving, a transcript is provided and processed to pick out the filler words said such as: 'like', 'you know', and 'whatever'. Before their big day, a user may also choose to be guided through a powerpose where a user can compose themselves and ensure a boost of confidence!

[SpeakGood Deployed on Heroku][speakgood-heroku]

[speakgood-heroku]: https://speakgood.herokuapp.com/

## Setup

To run SpeakGood on your local machine, do the following:

* Create a database in postgres called "speakgood"

```
createdb speakgood
npm run seed
```

* Fork to your repository and then clone the repo:

```
git clone https://github.com/speak-good/speak-good.git
```

* cd into your speakgood directory and then run the following commands:

```
npm install
npm run start-dev
```

* Follow `BOILERPLATE-README.md` for further instuctions.

## Firebase and OAuth Keys

Create a file called `secrets.js` in the project root

* This file is listed in `.gitignore`, and will _only_ be required
  in your _development_ environment
* Its purpose is to attach the secret environment variables that you
  will use while developing
* However, it's **very** important that you **not** push it to
  Github! Otherwise, _prying eyes_ will find your secret API keys!
* It might look like this:

```
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
}
module.exports = firebaseConfig

process.env.GOOGLE_CLIENT_ID = 'hush hush'
process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
```

### Firebase

* To use Firebase Storage, complete the steps above with your firebaseConfig supplied from Google Firebase

* You can get them from the [Firebase Project Settings][firebase-apis] once you've created a project and initialized Storage.

[firebase-apis]: https://firebase.google.com/?authuser=0

### OAuth

* To use OAuth with Google, complete the steps above with a real client
  ID and client secret supplied from Google
  * You can get them from the [Google APIs dashboard][google-apis].

[google-apis]: https://console.developers.google.com/apis/credentials

### Web Speech API
* For our speech-to-text functionality we chose the Web Speech API, because it does speech recognition in the browswer using a user's built in media devices. Documentation for the Web Speech API can be found here: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

* Since we used React, we chose the React-Speech-Recognition npm module which is a higher order component that wraps one of your root-level React components, giving Web Speech API access to its children components. Documentation for this higher order component can be found here: https://www.npmjs.com/package/react-speech-recognition

### RecordRTC
* For our recording capabilities, we chose RecordRTC to record our user's presentations. Documentation can be found for this API here: https://recordrtc.org/

## PoseNet

* PoseNet runs on TensorFlow.js 
* Dependencies include: 
  * "@tensorflow-models/posenet": "^2.1.3",
  * "@tensorflow/tfjs-converter": "^1.2.8",
  * "@tensorflow/tfjs-core": "^1.2.8"
  * For pose comparison and calculation: "compute-cosine-similarity": "^1.0.0"

* Camera.js - PoseNet setup
* PoseNetfunc.js - calculates the user input
* Utils.js has the “drawing” functionalities

