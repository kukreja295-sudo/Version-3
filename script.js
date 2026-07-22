document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     LOADER TITLE — letter-by-letter reveal
  ============================================================ */
  const loaderTitle = document.getElementById('loaderTitle');
  if(loaderTitle){
    const text = loaderTitle.textContent;
    loaderTitle.textContent = '';
    text.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'ch';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.setProperty('--d', `${0.15 + i * 0.045}s`);
      loaderTitle.appendChild(span);
    });
  }

  /* ============================================================
     LOADING SCREEN -> HEART-BURST CELEBRATION
  ============================================================ */
  const loadingScreen = document.getElementById('loading-screen');
  const burstLayer = document.getElementById('celebration-burst');

  function fireHeartBurst(){
    const hearts = ['❤️','💕','💗','✨'];
    const count = reduceMotion ? 8 : 30;
    for(let i = 0; i < count; i++){
      const el = document.createElement('span');
      el.className = 'burst-heart';
      el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist = 140 + Math.random() * 280;
      el.style.setProperty('--x', `${Math.cos(angle) * dist}px`);
      el.style.setProperty('--y', `${Math.sin(angle) * dist}px`);
      el.style.setProperty('--size', `${16 + Math.random() * 24}px`);
      el.style.setProperty('--dur', `${1.1 + Math.random() * 0.9}s`);
      el.style.setProperty('--delay', `${Math.random() * 0.4}s`);
      el.style.setProperty('--r', `${(Math.random() * 60) - 30}deg`);
      burstLayer.appendChild(el);
      setTimeout(() => el.remove(), 2400);
    }
  }

  window.setTimeout(() => {
    loadingScreen.classList.add('hide');
    fireHeartBurst();
    document.body.classList.add('loaded');
  }, 2000);

  /* ============================================================
     AMBIENT STARS
  ============================================================ */
  const starsLayer = document.getElementById('stars');
  const starCount = reduceMotion ? 20 : 65;
  for(let i = 0; i < starCount; i++){
    const s = document.createElement('span');
    s.className = 'star';
    s.style.top = `${Math.random() * 100}%`;
    s.style.left = `${Math.random() * 100}%`;
    s.style.setProperty('--dur', `${2 + Math.random() * 3}s`);
    s.style.setProperty('--delay', `${Math.random() * 4}s`);
    starsLayer.appendChild(s);
  }

  /* ============================================================
     AMBIENT PETALS
  ============================================================ */
  const petalsLayer = document.getElementById('petals');
  function spawnPetal(){
    const el = document.createElement('span');
    el.className = 'petal';
    el.style.setProperty('--x', `${Math.random() * 100}%`);
    el.style.setProperty('--size', `${9 + Math.random() * 9}px`);
    el.style.setProperty('--dur', `${11 + Math.random() * 9}s`);
    el.style.setProperty('--delay', `${Math.random() * 2}s`);
    el.style.setProperty('--sway', `${(Math.random() * 140) - 70}px`);
    petalsLayer.appendChild(el);
    setTimeout(() => el.remove(), 24000);
  }
  if(!reduceMotion){
    for(let i = 0; i < 5; i++) setTimeout(spawnPetal, i * 1800);
    setInterval(spawnPetal, 3400);
  }

  /* ============================================================
     AMBIENT FLOATING HEARTS
  ============================================================ */
  const heartsLayer = document.getElementById('floating-hearts');
  const heartChars = ['❤️','💕','🩷'];

  function spawnAmbientHeart(){
    const el = document.createElement('span');
    el.className = 'floating-heart';
    el.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    el.style.setProperty('--x', `${Math.random() * 100}%`);
    el.style.setProperty('--size', `${12 + Math.random() * 16}px`);
    el.style.setProperty('--dur', `${9 + Math.random() * 8}s`);
    el.style.setProperty('--drift', `${(Math.random() * 80) - 40}px`);
    heartsLayer.appendChild(el);
    setTimeout(() => el.remove(), 18000);
  }
  if(!reduceMotion){
    for(let i = 0; i < 4; i++) setTimeout(spawnAmbientHeart, i * 1400);
    setInterval(spawnAmbientHeart, 2600);
  }

  /* ============================================================
     PARALLAX (hero / ending images)
  ============================================================ */
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
  if(!reduceMotion && parallaxEls.length){
    let ticking = false;
    function updateParallax(){
      parallaxEls.forEach(el => {
        const rect = el.parentElement.getBoundingClientRect();
        const progress = 1 - Math.max(0, Math.min(1, rect.top / window.innerHeight));
        el.style.transform = `translateY(${progress * 40}px)`;
      });
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if(!ticking){ requestAnimationFrame(updateParallax); ticking = true; }
    }, { passive: true });
    updateParallax();
  }

  /* ============================================================
     MUSIC TOGGLE
  ============================================================ */
  const musicToggle = document.getElementById('musicToggle');
  const music = document.getElementById('backgroundMusic');
  let musicStarted = false;

  musicToggle.addEventListener('click', () => {
    if(!musicStarted){
      music.volume = 0.55;
      musicStarted = true;
    }
    if(music.paused){
      music.play().catch(() => {});
      musicToggle.classList.add('playing');
      musicToggle.setAttribute('aria-pressed', 'true');
    } else {
      music.pause();
      musicToggle.classList.remove('playing');
      musicToggle.setAttribute('aria-pressed', 'false');
    }
  });

  /* ============================================================
     SCROLL PROGRESS + BACK TO TOP
  ============================================================ */
  const progressBar = document.getElementById('progressBar');
  const backToTop = document.getElementById('backToTop');

  function onScroll(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${pct}%`;
    backToTop.classList.toggle('show', scrollTop > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ============================================================
     BEGIN STORY BUTTON
  ============================================================ */
  document.getElementById('beginStory').addEventListener('click', () => {
    document.getElementById('chapter1').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ============================================================
     CONSTELLATION RAIL
  ============================================================ */
  const chapters = Array.from(document.querySelectorAll('.chapter'));
  const dotsList = document.getElementById('constellationDots');
  const fill = document.getElementById('constellationFill');

  chapters.forEach(ch => {
    const li = document.createElement('li');
    li.dataset.target = ch.id;
    li.dataset.label = ch.dataset.title;
    li.setAttribute('title', ch.dataset.title);
    li.addEventListener('click', () => ch.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }));
    dotsList.appendChild(li);
  });
  const dots = Array.from(dotsList.children);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){ entry.target.classList.add('in-view'); }
    });
  }, { threshold: 0.28 });
  chapters.forEach(ch => revealObserver.observe(ch));

  const railObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const dot = dots.find(d => d.dataset.target === entry.target.id);
      if(!dot) return;
      if(entry.isIntersecting){
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        const index = chapters.indexOf(entry.target);
        fill.style.height = `${((index + 1) / chapters.length) * 100}%`;
      }
    });
  }, { threshold: 0.5 });
  chapters.forEach(ch => railObserver.observe(ch));

  /* ============================================================
     LOVE LETTER ENVELOPE
  ============================================================ */
  const envelope = document.getElementById('envelope');

  function toggleEnvelope(){
    const isOpen = envelope.classList.toggle('open');
    envelope.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
  envelope.addEventListener('click', toggleEnvelope);
  envelope.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      toggleEnvelope();
    }
  });

  /* ============================================================
     CONFETTI + FIREWORKS (reusable bursts)
  ============================================================ */
  const confettiLayer = document.getElementById('confetti-container');
  const fireworksLayer = document.getElementById('fireworks-container');
  const confettiColors = ['#e8c07d', '#f0aac4', '#a83a5c', '#fbf1e7'];

  function burstConfetti(originYvh = -5){
    const count = reduceMotion ? 20 : 60;
    for(let i = 0; i < count; i++){
      const el = document.createElement('span');
      el.className = 'confetti-piece';
      el.style.setProperty('--x', `${Math.random() * 100}%`);
      el.style.setProperty('--top', `${originYvh}vh`);
      el.style.setProperty('--w', `${5 + Math.random() * 5}px`);
      el.style.setProperty('--h', `${10 + Math.random() * 8}px`);
      el.style.setProperty('--c', confettiColors[Math.floor(Math.random() * confettiColors.length)]);
      el.style.setProperty('--dur', `${2.4 + Math.random() * 1.8}s`);
      el.style.setProperty('--delay', `${Math.random() * 0.6}s`);
      el.style.setProperty('--spin', `${360 + Math.random() * 540}deg`);
      confettiLayer.appendChild(el);
      setTimeout(() => el.remove(), 5200);
    }
  }

  function burstFireworkAt(xPct, yPct){
    const count = reduceMotion ? 10 : 28;
    for(let i = 0; i < count; i++){
      const el = document.createElement('span');
      el.className = 'firework-particle';
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
      const dist = 60 + Math.random() * 90;
      el.style.setProperty('--x', `${xPct}%`);
      el.style.setProperty('--y', `${yPct}%`);
      el.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      el.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
      el.style.setProperty('--c', confettiColors[Math.floor(Math.random() * confettiColors.length)]);
      el.style.setProperty('--dur', `${0.8 + Math.random() * 0.6}s`);
      fireworksLayer.appendChild(el);
      setTimeout(() => el.remove(), 1600);
    }
  }

  /* ============================================================
     BIRTHDAY CAKE CELEBRATION (replayable)
  ============================================================ */
  const celebrateButton = document.getElementById('celebrateButton');
  const cake = document.getElementById('cake');
  const wishMessage = document.getElementById('wishMessage');
  let animating = false;

  celebrateButton.addEventListener('click', () => {
    if(animating) return;
    animating = true;

    const alreadyBlown = cake.classList.contains('blown');

    if(!alreadyBlown){
      cake.classList.add('blown');
      burstConfetti(0);
      burstFireworkAt(50, 45);
      setTimeout(() => burstFireworkAt(30, 55), 250);
      setTimeout(() => burstFireworkAt(70, 55), 480);
      wishMessage.textContent = 'Wish made ✨ — happy birthday, Aru.';
      celebrateButton.textContent = '🕯️ Relight Candles';
      animating = false;
    } else {
      cake.classList.remove('blown');
      wishMessage.textContent = 'Make another wish, anytime.';
      celebrateButton.textContent = '🎉 Celebrate';
      animating = false;
    }
  });

});
