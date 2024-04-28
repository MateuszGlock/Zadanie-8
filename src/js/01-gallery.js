// Opisany w dokumentacji
import SimpleLightbox from '../../node_modules/simplelightbox/dist/simple-lightbox.js';
// Dodatkowy import stylów

import '../../node_modules/simplelightbox/dist/simple-lightbox.min.css'; // Import stylów CSS

import { galleryItems } from './gallery-items.js';

document.addEventListener('DOMContentLoaded', function () {
  const instance = new SimpleLightbox('.galleryitem a', {
    captions: true,
    captionDelay: 250,
    captionPosition: 'outside',
  });

  const gallery = document.querySelector('.gallery');

  const galleryDoc = document.createElement('ul');
  galleryDoc.classList.add('gallery');

  galleryItems.forEach(item => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('galleryitem');

    const link = document.createElement('a');
    link.classList.add('gallery__link');
    link.href = item.original;

    const img = document.createElement('img');
    img.classList.add('galleryimage');
    img.src = item.preview;
    img.title = item.description;

    img.dataset.source = item.original;

    link.appendChild(img);
    galleryItem.appendChild(link);

    galleryDoc.appendChild(galleryItem);
  });

  gallery.appendChild(galleryDoc);
  instance.refresh();

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && instance.isOpen()) {
      instance.close();
    }
  });
});
//
