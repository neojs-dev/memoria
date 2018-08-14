let STM = new Map();

export function getSTM() {
  return STM;
}

export function add(note) {
  STM.set(note.id, { title: note.title, content: note.content });
}

export function save() {
  const notesJSON = JSON.stringify([...STM]);
  localStorage.setItem('notes', notesJSON);
}

export function remove(id) {
  STM.delete(id);
  save();
}

export function get(id) {
  return STM.get(id);
}

export function update(newSTM) {
  STM = newSTM; 
}

export function merge() {
  const notes = localStorage.getItem('notes');
  const parsed = new Map(JSON.parse(notes));
  STM = new Map([...STM, ...parsed]);
}

