
export const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registration successful');
          })
          .catch((err) => {
            console.log('Service Worker registration failed:', err);
          });
      });
    }
  };
  