export function addClass(target, className) {
  target.classList.add(className);
}

export function removeClass(target, className) {
  target.classList.remove(className);
}

export function nonEmptyLineFilter(array) {
  const nonEmptyLines = array.filter(line => line.length > 0);
  return nonEmptyLines[0];
}

function generateUniqueID() {
  return new Date().getTime();
}

export function assignUniqueIDToElement(target) {
  const uniqueID = generateUniqueID();
  target.setAttribute('data-id', `${uniqueID}`);
}

export function debounce(callback, delay) {
  let timeoutID = undefined;
  return function() {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => callback.apply(this, arguments), delay);
  };
}

export function isDesktop(width) {
  return width > 992;
}
