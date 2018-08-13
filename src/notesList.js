import * as STM from './stm/stm.js';
import * as editor from './editor.js';
import * as sidebar from './sidebar.js';
import * as scrollbar from './scrollbar.js';
import { removeClass, addClass } from './helpers.js';

const list = document.querySelector('.notes');

function li(value, key, id) {
  return `
    <li data-id=${key} ${id === key ? "class='active'" : ''}>
      <span>${value.title}</span>
      <button title="Delete note" class="button-delete ns"></button>
    </li>
  `;
}

function create() {
  const _STM = STM.getSTM();
  const current = editor.getNote();

  let itemsHTML = [];
  _STM.forEach((value, key) => {
    itemsHTML.push(li(value, key, current.id));
  });

  return itemsHTML.join('');
}

function highlight(target) {
  const active = target.parentNode.querySelector('.active');
  if (active) removeClass(active, 'active');
  addClass(target, 'active');
}

export function remove(target) {
  target.parentNode.removeChild(target);
}

export function render() {
  list.innerHTML = create();
}

export function select(id, target) {
  editor.showNote(id);
  highlight(target);
  editor.resetScroll();
  scrollbar.update();
  sidebar.close();
}
