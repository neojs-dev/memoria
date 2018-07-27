const statusbar = document.querySelector('.statusbar');

export function getTextContent() {
  return statusbar.textContent;
}

export function changeTextContent(text) {
  statusbar.textContent = text;
}
