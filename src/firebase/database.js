import * as STM from '../stm/stm.js';
import * as notesList from '../notesList.js';
import * as loading from '../loading.js';
import { getCurrentUserId } from './helpers.js';

function merge(notes) {
  const localNotes = STM.getSTM();
  const parsed = new Map(JSON.parse(notes));
  const newSTM = new Map([...localNotes, ...parsed]);
  STM.update(newSTM);  
}

function sync(lastOnline, lastOnlineRef) {
  const notes = STM.getSTM();
  const keys = notes.keys();
  for (let key of keys) {
    if (Number(key) > lastOnline) {
      save();
    }
  }
}

export function save() {
  const userId = getCurrentUserId();
  const notes = STM.getSTM();
  const notesJSON = JSON.stringify([...notes]);
  firebase.database().ref(`users/${userId}/notes`).set(notesJSON);
}

export function load() {
  const userId = getCurrentUserId();
  firebase.database().ref(`users/${userId}`).once('value').then(snapshot => {
    const notes = snapshot.val().notes;
    if (notes) {
      merge(notes);
      notesList.render();
    }
    loading.hide();
  });
}

export function userPresence() {
  const userId = getCurrentUserId();
  const lastOnlineRef = firebase.database().ref(`users/${userId}/lastOnline`);
  const connectedRef = firebase.database().ref('.info/connected');
  connectedRef.on('value', snapshot => {
    if (snapshot.val() === true) {
      lastOnlineRef.once('value').then(snapshot => {
        sync(snapshot.val(), lastOnlineRef);
      });
      lastOnlineRef.onDisconnect().set(new Date().getTime());  
    };
  });
}

