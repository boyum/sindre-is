const SPLASH_SCREEN_KEY = 'SPLASH_SCREEN_HAS_BEEN_SHOWN';
const SPLASH_SCREEN_DURATION = 2000;

const showSplashScreen = !Boolean(sessionStorage[SPLASH_SCREEN_KEY]);
const forceShowSplashScreen = location.search.includes('splashscreen=true');

if (showSplashScreen || forceShowSplashScreen) {
  const className = 'show-splash-screen';
  document.documentElement.classList.add(className);
  sessionStorage.setItem(SPLASH_SCREEN_KEY, true);

  setTimeout(() => document.documentElement.classList.remove(className), SPLASH_SCREEN_DURATION);
}