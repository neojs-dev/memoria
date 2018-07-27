let STM = new Map();

export function getSTM() {
  return STM;
}

export function add(note) {
  STM.set(note.id, { title: note.title, content: note.content });
}

export function save() {
  localStorage.setItem('notes', JSON.stringify([...STM]));
}

export function remove(id) {
  STM.delete(id);
  save();
}

export function get(id) {
  return STM.get(id);
}

export function merge() {
  const notes = localStorage.getItem('notes');
  const parsed = new Map(JSON.parse(notes));
  STM = new Map([...STM, ...parsed]);
}
