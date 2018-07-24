function isActive(target) {
  return target.classList.contains('active');
}

function toggleClass(target, className) {
  target.classList.toggle(className);
}

function addClass(target, className) {
  target.classList.add(className);
}

function removeClass(target, className) {
  target.classList.remove(className);
}

function nonEmptyLineFilter(array) {
  const nonEmptyLines = array.filter(line => line.length > 0);
  return nonEmptyLines[0];
}

function generateUniqueID() {
  return new Date().getTime();
}

function assignUniqueIDToElement(target) {
  const uniqueID = generateUniqueID();
  target.setAttribute('data-id', `${uniqueID}`);
}

function debounce(callback, delay) {
  let timeoutID = undefined;
  return function() {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => callback.apply(this, arguments), delay);
  };
}

function isDesktop(width) {
  return width > 992;
}
