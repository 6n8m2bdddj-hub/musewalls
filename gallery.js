const dialog = document.querySelector('dialog');
const video = dialog.querySelector('video');
const title = dialog.querySelector('h2');

document.querySelectorAll('.play').forEach(link => {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.showModal) return;
    event.preventDefault();
    title.textContent = link.dataset.title;
    video.setAttribute('aria-label', title.textContent);
    const poster = link.getAttribute('href').replace(/\.mp4$/, '.jpg');
    video.poster = 'preview/640/' + poster;
    video.src = link.href;
    dialog.showModal();
    video.play().catch(() => { /* Native controls remain available for manual playback. */ });
  });
});

dialog.addEventListener('close', () => {
  video.pause();
  video.removeAttribute('src');
  video.load();
});
