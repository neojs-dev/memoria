import * as STM from './db/stm.js';
import * as editor from './editor.js';
import * as sidebar from './sidebar.js';
import * as notesList from './notesList.js';
import * as scrollbar from './scrollbar.js';
import { removeClass } from './helpers.js';

const body = document.querySelector('body');

function handleLoad() {
  removeClass(body, 'preload');
}

function handleDOMContentLoaded() {
  editor.assignUniqueID();
  STM.merge();
  notesList.render();
}

function handleClick(event) {
  if (event.target) {
    if (event.target.matches('.button-add')) {
      editor.add();
    }

    if (event.target.matches('.button-sidebar-open')) {
      sidebar.open();
    }

    if (event.target.matches('.button-sidebar-close')) {
      sidebar.close();
    }

    if (event.target.matches('.button-delete')) {
      sidebar.remove(
        event.target.parentNode.dataset.id,
        event.target.parentNode,
      );
    }

    if (event.target.matches('.notes li span')) {
      notesList.select(
        event.target.parentNode.dataset.id,
        event.target.parentNode,
      );
    }
  }
}

window.addEventListener('load', handleLoad, true);
document.addEventListener('DOMContentLoaded', handleDOMContentLoaded, false);
document.addEventListener('click', handleClick, false);
