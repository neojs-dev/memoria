self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(`memoria-v010`)
      .then(cache =>
        cache.addAll([
          './',
          './index.html',
          './favicon.ico',
          './manifest.json',
          './style.css',
          './icons/day/burger.svg',
          './icons/day/plus.svg',
          './icons/day/theme.svg',
          './icons/day/x.svg',
          './icons/night/burger.svg',
          './icons/night/plus.svg',
          './icons/night/theme.svg',
          './icons/night/x.svg',
          './icons/memoria.png',
          './src/firebase/firebase.js',
          './src/firebase/auth.js',
          './src/firebase/database.js',
          './src/firebase/helpers.js',
          './src/stm/preference.js',
          './src/stm/stm.js',
          './src/app.js',
          './src/editor.js',
          './src/helpers.js',
          './src/loading.js',
          './src/notesList.js',
          './src/scrollbar.js',
          './src/sidebar.js',
          './src/signIn.js',
          './src/statusbar.js',
          './src/theme.js',
        ]),
      ),
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(
        event.request.url.endsWith('.js')
          ? new Request(event.request.url, {
              mode: 'cors',
              credentials: 'omit',
            })
          : event.request,
      )
      .then(response => response || fetch(event.request)),
  );
});
