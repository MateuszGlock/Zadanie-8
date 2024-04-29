import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// Inicjalizacja odtwarzacza Vimeo
const player = new Player('vimeo-player');

// Zdefiniuj funkcję, która będzie aktualizować czas odtwarzania i zapisywać go w local storage
const updateAndSaveCurrentTime = throttle(async () => {
  try {
    const currentTime = await player.getCurrentTime();
    localStorage.setItem('videoplayer-current-time', currentTime.toString());
  } catch (error) {
    console.error('Błąd podczas zapisywania czasu odtwarzania: ', error);
  }
}, 1000); // Throttle ustawiony na 1 sekundę

// Śledzenie zdarzenia "timeupdate"
player.on('timeupdate', updateAndSaveCurrentTime);

// Przy przeładowaniu strony odtwarzaj wideo od zapisanego czasu
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const currentTime = localStorage.getItem('videoplayer-current-time');
    if (currentTime) {
      await player.setCurrentTime(parseFloat(currentTime));
    }
  } catch (error) {
    console.error('Błąd podczas ustawiania czasu odtwarzania: ', error);
  }
});
