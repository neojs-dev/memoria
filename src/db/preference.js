export function save(key, value) {
  localStorage.setItem(key, value);
}

export function get(key) {
  return localStorage.getItem(key);
}
