(() => {
  let theme;
  try { theme = localStorage.getItem('avante-theme'); } catch {}
  if (theme !== 'light' && theme !== 'dark') {
    theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1e2c3f' : '#ffffff');
})();
