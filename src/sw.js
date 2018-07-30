export function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then(() => console.log('Success'))
      .catch(error => console.log('Error', error));
  }
}
