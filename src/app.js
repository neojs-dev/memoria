import * as STM from './stm/stm.js';
import * as preference from './stm/preference.js';
import * as editor from './editor.js';
import * as sidebar from './sidebar.js';
import * as notesList from './notesList.js';
import * as theme from './theme.js';
import * as signIn from './signIn.js';
import * as firebase from './firebase/firebase.js';
import { removeClass, registerServiceWorker } from './helpers.js';

const body = document.querySelector('body');

function handleLoad() {
  removeClass(body, 'preload');
  firebase.init();
  registerServiceWorker();
}

function handleDOMContentLoaded() {
  theme.load(preference.get('theme') || false);
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

    if (event.target.matches('.button-toggle-theme')) {
      theme.toggle();
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

    if (event.target.matches('.button-signin')) {
      signIn.sendEmail();
    }
  }
}

window.addEventListener('load', handleLoad, true);
document.addEventListener('DOMContentLoaded', handleDOMContentLoaded, false);
document.addEventListener('click', handleClick, false);
