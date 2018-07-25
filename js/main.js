const body = document.querySelector('body');
const noteTextArea = document.querySelector('.note');
const sidebar = document.querySelector('.sidebar');
const notesList = document.querySelector('.notes');
const statusBar = document.querySelector('.status-bar');
const scrollBar = document.querySelector('.scroll-bar');
const newNoteButton = document.querySelector('.button-new');
const sidebarButton = document.querySelector('.button-sidebar');

const ACTIVE = 'active';
const HIDDEN = 'hidden';

function toggleSidebar() {
  toggleClass(sidebar, ACTIVE);
  toggleClass(sidebarButton, ACTIVE);
  toggleClass(noteTextArea, HIDDEN);
  toggleClass(newNoteButton, HIDDEN);
  toggleClass(statusBar, HIDDEN);
}

function hideSidebar() {
  if (isActive(sidebar)) {
    toggleSidebar();
  }
}

function getNoteTitle(content) {
  const splittedContent = content.split('\n');
  const title = nonEmptyLineFilter(splittedContent);
  return title;
}

function getCurrentNote(textArea) {
  const [id, title, content] = [
    textArea.dataset.id,
    getNoteTitle(textArea.value),
    textArea.value,
  ];
  return { id, title, content };
}

function emptyTextArea(textArea) {
  textArea.value = '';
}

function createNewNote() {
  emptyTextArea(noteTextArea);
  noteTextArea.focus();
  assignUniqueIDToElement(noteTextArea);
}

function saveNote() {
  const currentNote = getCurrentNote(noteTextArea);
  if (currentNote.title) {
    addToLocalNotes(currentNote);
    saveToLocalStorage(localNotes);
    renderNotesList();
  }
  statusBar.textContent = 'Saved';
}

const autoSave = debounce(saveNote, 800);

function getScrollPrecentage(target) {
  const scrollTop = target.scrollTop;
  const scrollHeight = target.scrollHeight;
  const offsetHeight = target.offsetHeight;
  const maximumAmount = scrollHeight - offsetHeight;
  const precentage = Math.round((scrollTop / maximumAmount) * 100);
  return precentage || 0;
}

function updateScrollBar() {
  if (isDesktop(window.innerWidth)) {
    if (noteTextArea.scrollHeight > sidebar.scrollHeight) {
      scrollBar.style.width = `${getScrollPrecentage(noteTextArea)}%`;
    } else {
      scrollBar.style.width = `${getScrollPrecentage(sidebar)}%`;
    }
  }
}

function deleteNoteFromLocalStorage(noteID) {
  for (let key of Object.keys(localNotes)) {
    if (key === noteID) {
      delete localNotes[key];
    }
  }
  saveToLocalStorage(localNotes);
}

function deleteNoteFromRenderedList(target) {
  target.parentNode.removeChild(target);
}

function deleteNote(noteID, target) {
  deleteNoteFromRenderedList(target);
  emptyTextArea(noteTextArea);
  updateScrollBar();
  deleteNoteFromLocalStorage(noteID);
}

function createNotesList() {
  const currentNote = getCurrentNote(noteTextArea);
  const notesListArray = Object.keys(localNotes).map(
    key =>
      `<li data-id=${key} ${currentNote.id === key ? "class='active'" : ''}>
        <span>${localNotes[key].title}</span>
        <button title="Delete Note" class="button-delete"></button>
      </li>`,
  );
  return notesListArray.join('');
}

function renderNotesList() {
  notesList.innerHTML = createNotesList();
}

function getNoteFromlocalNotes(noteID) {
  for (let key of Object.keys(localNotes)) {
    if (key === noteID) {
      noteTextArea.value = localNotes[key].content;
      noteTextArea.dataset.id = key;
    }
  }
}

function highlightActiveNote(target) {
  const activeNote = target.parentNode.querySelector('.active');
  if (activeNote) {
    removeClass(activeNote, 'active');
  }
  addClass(target, 'active');
}

function selectNote(noteID, target) {
  getNoteFromlocalNotes(noteID);
  highlightActiveNote(target);
  resetScroll();
  updateScrollBar();
  hideSidebar();
}

function syncWheel(deltaY) {
  sidebar.scrollTop += deltaY;
  noteTextArea.scrollTop += deltaY;
}

function resetScroll() {
  noteTextArea.scrollTop = 0;
}

function handleLoad() {
  removeClass(body, 'preload');
}

function handleDOMContentLoaded() {
  assignUniqueIDToElement(noteTextArea);
  combineLocalNotes();
  renderNotesList();
}

function handleClick(event) {
  if (event.target) {
    if (
      event.target.matches('button.button-sidebar') ||
      event.target.matches('button.button-sidebar span')
    ) {
      toggleSidebar();
    }

    if (
      event.target.matches('button.button-new') ||
      event.target.matches('button.button-new span')
    ) {
      createNewNote();
    }

    if (event.target.matches('button.button-delete')) {
      deleteNote(event.target.parentNode.dataset.id, event.target.parentNode);
    }

    if (event.target.matches('ul.notes li span')) {
      selectNote(event.target.parentNode.dataset.id, event.target.parentNode);
    }
  }
}

function handleKeyDown() {
  if (statusBar.textContent !== 'Saving') {
    statusBar.textContent = 'Saving';
  }
}

function handleKeyUp() {
  updateScrollBar();
  autoSave();
}

function handleWheel(event) {
  event.preventDefault();
  syncWheel(event.deltaY);
  updateScrollBar();
}

window.addEventListener('load', handleLoad, true);
document.addEventListener('DOMContentLoaded', handleDOMContentLoaded, false);
document.addEventListener('click', handleClick, false);
noteTextArea.addEventListener('keydown', handleKeyDown, false);
noteTextArea.addEventListener('keyup', handleKeyUp, false);
document.addEventListener('wheel', handleWheel, false);
