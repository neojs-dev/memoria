import * as database from './database.js';
import * as signIn from '../signIn.js';
import * as loading from '../loading.js';

export default function handleAuthState() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      signIn.hide(); 
      database.load();
    } else {
      signIn.show();
      loading.hide();
    } 
  });
}

