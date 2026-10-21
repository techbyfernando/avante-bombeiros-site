document.documentElement.classList.add('js');

const themeButton = document.querySelector('.theme-toggle');
function syncThemeButton() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  if (!themeButton) return;
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
  themeButton.title = isDark ? 'Ativar tema claro' : 'Ativar tema escuro';
}
syncThemeButton();
themeButton?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('avante-theme', next); } catch {}
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#101719' : '#f3f3ef');
  syncThemeButton();
});

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu-overlay');
const menuLinks = [...menu.querySelectorAll('a')];

function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menu.setAttribute('aria-hidden', String(!open));
  menu.inert = !open;
  if (open) menuLinks[0]?.focus();
  else menuButton.focus();
}

menu.inert = true;
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
menuLinks.forEach(link => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  menu.setAttribute('aria-hidden', 'true');
  menu.inert = true;
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false);
  if (event.key !== 'Tab' || !document.body.classList.contains('menu-open')) return;
  const first = menuLinks[0];
  const last = menuLinks[menuLinks.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

const tabs = [...document.querySelectorAll('.service-tab')];
const panels = [...document.querySelectorAll('.service-panel')];
const gsapReady = typeof window.gsap !== 'undefined';
const scrollTriggerReady = gsapReady && typeof window.ScrollTrigger !== 'undefined';
const splitTextReady = gsapReady && typeof window.SplitText !== 'undefined';
const flipReady = gsapReady && typeof window.Flip !== 'undefined';
if (gsapReady) {
  const plugins = [window.ScrollTrigger, window.SplitText, window.Flip].filter(Boolean);
  window.gsap.registerPlugin(...plugins);
}
const serviceRail = tabs.length ? document.createElement('span') : null;
if (serviceRail) {
  serviceRail.className = 'service-active-rail';
  serviceRail.setAttribute('aria-hidden', 'true');
  tabs.find(tab => tab.classList.contains('is-active'))?.append(serviceRail);
}
function activateTab(tab, moveFocus = false) {
  const railState = flipReady && serviceRail?.isConnected ? window.Flip.getState(serviceRail) : null;
  tabs.forEach(item => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  panels.forEach(panel => {
    const active = panel.id === tab.getAttribute('aria-controls');
    panel.hidden = !active;
    panel.classList.toggle('is-active', active);
  });
  if (serviceRail) tab.append(serviceRail);
  if (railState && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.Flip.from(railState, { duration: 0.44, ease: 'expo.out', absolute: true });
  }
  const activePanel = panels.find(panel => !panel.hidden);
  if (gsapReady && activePanel && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.gsap.fromTo(activePanel, { autoAlpha: 0.55, clipPath: 'inset(0 0 8% 0)' }, { autoAlpha: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.46, ease: 'expo.out', clearProps: 'clipPath,opacity,visibility' });
  }
  if (moveFocus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    activateTab(tabs[next], true);
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && splitTextReady) {
  const heroTitle = document.querySelector('[data-gsap-split]');
  if (heroTitle) {
    window.SplitText.create(heroTitle, {
      type: 'lines,words',
      linesClass: 'gsap-line',
      wordsClass: 'gsap-word',
      autoSplit: true,
      aria: 'auto',
      onSplit(instance) {
        return window.gsap.from(instance.words, {
          yPercent: 112,
          opacity: 0,
          rotate: 1.2,
          duration: 0.78,
          stagger: 0.055,
          ease: 'expo.out',
          delay: 0.08,
        });
      },
    });
  }
}

if (!reducedMotion && scrollTriggerReady) {
  window.gsap.fromTo('.partners-heading',
    { clipPath: 'inset(0 0 100% 0)', y: 24 },
    { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.72, ease: 'expo.out', scrollTrigger: { trigger: '.partners', start: 'top 76%', once: true }, clearProps: 'clipPath,transform' });
  window.gsap.fromTo('.partners-rows',
    { opacity: 0.15, filter: 'blur(8px)' },
    { opacity: 1, filter: 'blur(0px)', duration: 0.72, ease: 'expo.out', scrollTrigger: { trigger: '.partners-rows', start: 'top 82%', once: true }, clearProps: 'filter,opacity' });
  window.gsap.fromTo('[data-gsap-directory] a',
    { y: 14, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.48, stagger: 0.055, ease: 'expo.out', scrollTrigger: { trigger: '[data-gsap-directory]', start: 'top 84%', once: true }, clearProps: 'transform,opacity' });
}
const revealElements = document.querySelectorAll('[data-reveal]');
const revealSiblingCounts = new WeakMap();
revealElements.forEach(element => {
  const parent = element.parentElement;
  const index = revealSiblingCounts.get(parent) || 0;
  revealSiblingCounts.set(parent, index + 1);
  element.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 70}ms`);
});
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  revealElements.forEach(element => observer.observe(element));
} else revealElements.forEach(element => element.classList.add('is-visible'));

const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress');
const hero = document.querySelector('.hero');
if (!hero) document.body.classList.add('inner-page');
let ticking = false;
function updateScroll() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${maxScroll > 0 ? window.scrollY / maxScroll * 100 : 0}%`;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
  if (hero) {
    const revealPoint = Math.max(220, hero.offsetHeight * 0.72);
    document.body.classList.toggle('is-past-hero', window.scrollY > revealPoint);
  } else document.body.classList.toggle('is-past-hero', window.scrollY > Math.min(320, window.innerHeight * 0.35));
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { window.requestAnimationFrame(updateScroll); ticking = true; }
}, { passive: true });
updateScroll();

const floatingSuppressionTargets = [document.querySelector('.service-directory'), document.querySelector('.inner-cta')].filter(Boolean);
if ('IntersectionObserver' in window && floatingSuppressionTargets.length) {
  const visibleSuppressionTargets = new Set();
  const floatingObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visibleSuppressionTargets.add(entry.target);
      else visibleSuppressionTargets.delete(entry.target);
    });
    document.body.classList.toggle('floating-contact-suppressed', visibleSuppressionTargets.size > 0);
  }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
  floatingSuppressionTargets.forEach(target => floatingObserver.observe(target));
}

const requestedService = new URLSearchParams(window.location.search).get('servico');
const serviceSelect = document.querySelector('#servico');
if (requestedService && serviceSelect && [...serviceSelect.options].some(option => option.value === requestedService || option.textContent === requestedService)) {
  serviceSelect.value = requestedService;
}

const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.defaultMuted = true;
  heroVideo.loop = true;
  heroVideo.addEventListener('ended', () => { heroVideo.currentTime = 0; heroVideo.play().catch(() => {}); });
  heroVideo.addEventListener('pause', () => {
    if (!document.hidden) window.setTimeout(() => heroVideo.play().catch(() => {}), 400);
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && heroVideo.paused) heroVideo.play().catch(() => {});
  });
  heroVideo.play().catch(() => {});
}

document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));

document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get('nome') || '').trim();
  const company = String(data.get('empresa') || '').trim();
  const service = String(data.get('servico') || '').trim();
  const message = String(data.get('mensagem') || '').trim();
  const lines = [
    'Olá, equipe Avante! Gostaria de solicitar uma avaliação.',
    `Nome: ${name}`,
    ...(company ? [`Empresa/instituição: ${company}`] : []),
    `Interesse: ${service}`,
    ...(message ? [`Necessidade: ${message}`] : []),
  ];
  window.location.href = `https://wa.me/5511991968530?text=${encodeURIComponent(lines.join('\n'))}`;
});
