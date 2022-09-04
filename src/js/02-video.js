import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

var throttle = require('lodash.throttle');

// Инициализируй плеер в файле скрипта как это 
// описано в секции pre - existing player,
// но учти что у тебя плеер добавлен как npm пакет, а не через CDN.

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

// Разбери документацию метода on() и начни отслеживать 
// событие timeupdate - обновление времени воспроизведения.
// Сохраняй время воспроизведения в локальное хранилище. 
// Пусть ключом для хранилища будет строка "videoplayer-current-time".

const STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(function (time) {

  localStorage.setItem(STORAGE_KEY, time.seconds);
  
}, 1000));


// При перезагрузке страницы воспользуйся методом setCurrentTime()
//  для того чтобы возобновить воспроизведение с сохраненной позиции.
     
player
  .setCurrentTime(localStorage.getItem(STORAGE_KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
