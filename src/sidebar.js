import * as STM from './stm/stm.js';
import * as editor from './editor.js';
import * as notesList from './notesList.js';
import * as scrollbar from './scrollbar.js';
import * as database from './firebase/database.js';
import { addClass, removeClass } from './helpers.js';

const sidebar = document.querySelector('.sidebar');

export function open() {
  addClass(sidebar, 'active');
}

export function close() {
  removeClass(sidebar, 'active');
}

export function remove(id, target) {
  notesList.remove(target);
  editor.empty();
  scrollbar.update();
  STM.remove(id);
  database.save();
}
