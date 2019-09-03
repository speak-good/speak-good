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

## PoseNet

* PoseNet runs on TensorFlow.js 
* Dependencies include: 
  * "@tensorflow-models/posenet": "^2.1.3",
  * "@tensorflow/tfjs-converter": "^1.2.8",
  * "@tensorflow/tfjs-core": "^1.2.8"
  * For pose comparison and calculation: "compute-cosine-similarity": "^1.0.0"

* Camera.js - PoseNet setup
  * static defaultProps - video setup and sizing variables
  * navigator.mediaDevices.getUserMedia() - method on the browser to grab specified user media
  * componentDidMount() - sets up camera and loads PoseNet model
* PoseNetfunc.js - calculates the user input
  * findPoseDetectionFrame
    * flatImageData grabs reference image’s normalized array from finalData.js (via PowerPose.js)
    * grabs user data and pushes into poses array to be normalized in normArray1 
    * Normalized array generator called from flatArrGen
* "Compare" function performs cosineSimilarity and then finds cosine distance 
* Thunk calls to the trainer store to set score calculation to state
* estimateSinglePose() - PoseNet’s built in methods to estimate poses
    * we use forEach on each pose in the resulting poses array to draw the key body points and skeleton
* Utils.js has the “drawing” functionalities
* requestAnimationFrame() - built in function from the window. tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation

