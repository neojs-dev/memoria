const loading = document.querySelector('.loading');

export function show() {
  loading.style.display = 'flex';
}

export function hide() {
  loading.style.display = 'none';
}

