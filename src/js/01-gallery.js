// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
const galleryContainer = document.querySelector('.gallery');
const picturesMarkup = createPictureMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', picturesMarkup);
galleryContainer.addEventListener('click', onGalleryItemsClick);

function createPictureMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
   <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}"
    data-source="${original}"
    alt="${description}" />
  </a>
</div>
    `;
    })
    .join('');
}
function onGalleryItemsClick(evt) {
  evt.preventDefault();
  const isPictureEl = evt.target.classList.contains('gallery__image');
  if (!isPictureEl) {
    return;
  }
  const currentPicture = evt.target.dataset.source;
  const instance = basicLightbox.create(`
    <img src="${currentPicture}" alt=""/>
`);
  instance.show();
  window.addEventListener('keydown', onEscKeyPress);

  function onEscKeyPress(event) {
    console.log(event.code);

    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', onEscKeyPress);
    }
  }
}
