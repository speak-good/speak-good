#SpeakGood

_Speak Good, Feel Great_

SpeakGood is a web-application designed to help users become better public speakers and interviewers at their own convenience.

[SpeakGood on Deployed on Heroku][speakgood-heroku]

[speakgood-heroku]: https://speakgood.herokuapp.com/

## Setup

To run SpeakGood on your local machine, do the following:

\*Create a database in postgres called "speakgood"

```
createdb speakgood
npm run seed
```

\*Fork to your repository and then clone the repo:

```
git clone https://github.com/speak-good/speak-good.git
```

cd into your speakgood directory and then run the following commands:

```
npm install
npm run start-dev
```

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

\*To use Firebase Storage, complete the steps above with your firebaseConfig supplied from Google Firebase

* You can get them from the [Firebase Project Settings][firebase-apis] once you've created a project and initialized Storage.

[firebase-apis]: https://firebase.google.com/?authuser=0

### OAuth

* To use OAuth with Google, complete the steps above with a real client
  ID and client secret supplied from Google
  * You can get them from the [Google APIs dashboard][google-apis].

[google-apis]: https://console.developers.google.com/apis/credentials
