import * as signIn from '../signIn.js';
import handleAuthState from './auth.js';

export function init() {
  const config = {
    apiKey: 'AIzaSyBV2OTDi65_OBbIaqk_4RQBPAlFqzgwUKY',
    authDomain: 'memoria-a15c2.firebaseapp.com',
    databaseURL: 'https://memoria-a15c2.firebaseio.com',
    projectId: 'memoria-a15c2',
    storageBucket: 'memoria-a15c2.appspot.com',
    messagingSenderId: '1000058123713',
  };

  firebase.initializeApp(config);

  signIn.handleSignIn();

  handleAuthState();
}

