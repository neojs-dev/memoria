import * as database from './database.js';
import * as signIn from '../signIn.js';
import * as loading from '../loading.js';

export default function handleAuthState() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      loading.show();
      signIn.hide(); 
      database.load();
      database.userPresence();
    } else {
      signIn.show();
      loading.hide();
    } 
  });
}

