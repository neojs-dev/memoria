let localNotes = {};

function isInLocalNotes(noteID) {
  for (let key of Object.keys(localNotes)) {
    if (key === noteID) {
      return true;
    }
    return false;
  }
}

function addToLocalNotes(note) {
  if (isInLocalNotes(note.id)) {
    localNotes[note.id].title = note.title;
    localNotes[note.id].content = note.content;
  } else {
    localNotes[note.id] = { title: note.title, content: note.content };
  }
}

function saveToLocalStorage(notes) {
  localNotesJSONString = JSON.stringify(notes);
  localStorage.setItem('notes', localNotesJSONString);
}

function getNotesFromLocalStorage() {
  const localNotesObject = JSON.parse(localStorage.getItem('notes'));
  return localNotesObject;
}

function combineLocalNotes() {
  localNotes = Object.assign({}, localNotes, getNotesFromLocalStorage());
}
