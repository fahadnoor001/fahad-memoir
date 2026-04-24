// FAHAD — The Index
// Minimal interactions: mute toggle + mobile nav + video loop trim.

(function () {
  'use strict';

  // ===== LOADER =====
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(() => loader.classList.add('hidden'), 1200);
    setTimeout(() => loader.remove(), 2000);
  });

  // ===== VIDEO HERO: mute toggle + 30s loop trim =====
  const video = document.getElementById('heroVideo');
  const muteBtn = document.getElementById('muteToggle');
  const muteIcon = document.getElementById('muteIcon');
  const muteLabel = document.getElementById('muteLabel');

  if (video) {
    video.addEventListener('timeupdate', () => {
      if (video.currentTime >= 30) video.currentTime = 0;
    });
  }

  if (muteBtn && video) {
    muteBtn.addEventListener('click', () => {
      const willMute = !video.muted;
      video.muted = willMute;
      if (muteLabel) muteLabel.textContent = willMute ? 'Sound off' : 'Sound on';
      if (muteIcon) {
        muteIcon.innerHTML = willMute
          ? '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>'
          : '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>';
      }
    });
  }

  // ===== MOBILE NAV =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // ===== SMOOTH ANCHOR SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
