import * as STM from './db/stm.js';
import * as notesList from './notesList.js';
import * as statusbar from './statusbar.js';
import * as scrollbar from './scrollbar.js';
import {
  nonEmptyLineFilter,
  assignUniqueIDToElement,
  debounce,
} from './helpers.js';

const editor = document.querySelector('.editor');

export function empty() {
  editor.value = '';
}

function getTitle() {
  const content = editor.value;
  const splitted = content.split('\n');
  const title = nonEmptyLineFilter(splitted);
  return title;
}

export function getNote() {
  const [id, title, content] = [editor.dataset.id, getTitle(), editor.value];
  return { id, title, content };
}

function save() {
  const note = getNote();
  if (note.title) {
    STM.add(note);
    STM.save();
    notesList.render();
  }
  statusbar.changeTextContent('Saved');
}

const autoSave = debounce(save, 600);

export function assignUniqueID() {
  assignUniqueIDToElement(editor);
}

export function add() {
  empty();
  editor.focus();
  assignUniqueID();
}

export function showNote(id) {
  const note = STM.get(id);
  if (note) {
    editor.value = note.content;
    editor.dataset.id = id;
  }
}

export function resetScroll() {
  editor.scrollTop = 0;
}

function handleKeyUp() {
  scrollbar.update();
  autoSave();
}

function handleKeyDown() {
  if (statusbar.getTextContent() !== 'Saving') {
    statusbar.changeTextContent('Saving');
  }
}

editor.addEventListener('keyup', handleKeyUp, false);
editor.addEventListener('keydown', handleKeyDown, false);
