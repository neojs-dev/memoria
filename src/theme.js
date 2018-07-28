import * as preference from './db/preference.js';

const themes = {
  day: {
    '--main-color': '#1f1f1f',
    '--main-color-1': '#a1a1a1',
    '--main-color-2': '#dddddd',
    '--main-color-3': '#fc427b',
    '--main-bg-color': '#f7f7f7',
  },
  night: {
    '--main-color': '#f7f7f7',
    '--main-color-1': '#a5a5a5',
    '--main-color-2': '#393939',
    '--main-color-3': '#fc427b',
    '--main-bg-color': '#1f1f1f',
  },
};

const button = document.querySelector('.button-toggle-theme');
const buttons = document.querySelectorAll('[class^="button-"]:not(.ns)');

export function load(theme) {
  if (theme) {
    const t = themes[theme];

    let styles = document.documentElement.style;
    Object.keys(t).forEach(key => styles.setProperty(key, t[key]));

    loadIcons(theme);

    button.setAttribute('title', `${theme === 'day' ? 'Night' : 'Day'} mode`);

    preference.save('theme', theme);
  }
}

function loadIcons(theme) {
  buttons.forEach(button => {
    let name = button.dataset.button;
    button.style.backgroundImage = `url('../icons/${theme}/${name}.svg`;
  });
}

export function toggle() {
  const theme = preference.get('theme');
  if (theme === 'day') {
    load('night');
  } else {
    load('day');
  }
}
