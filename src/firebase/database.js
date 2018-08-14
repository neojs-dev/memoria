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

export function save() {
  const userId = getCurrentUserId();
  const notes = STM.getSTM();
  const notesJSON = JSON.stringify([...notes]);
  firebase.database().ref(`users/${userId}/notes`).set(notesJSON);
}

function sync() {
  const userId = getCurrentUserId();
  firebase.database().ref(`users/${userId}`).once('value').then(snapshot => {
    const notes = snapshot.val().notes;
    if (notes) {
      merge(notes);
      save();
    }
  });
}

export function load() {
  const userId = getCurrentUserId();
  firebase.database().ref(`users/${userId}`).once('value').then(snapshot => {
    const notes = snapshot.val().notes;
    if (notes) {
      merge(notes);
      notesList.render();
    }
  });
}

export function connectionListener() {
  const connectionRef = firebase.database().ref('.info/connected');
  connectionRef.on('value', snapshot => {
    if (snapshot.val() === true) {
      sync();
    }
  });
}

