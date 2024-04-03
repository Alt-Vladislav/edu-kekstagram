import { openFullPhoto } from './full-photo-popup.js';

const thumbnailTeamplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsContainerElement = document.querySelector('.pictures');
let postsData = '';

const onThumbnailClick = (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    evt.preventDefault();

    if (postsData !== '') {
      openFullPhoto(+evt.target.dataset.id, postsData);
    }
  }
};

const renderThumbnails = (dataFromServer) => {
  postsData = dataFromServer;
  const thumbnailsFragment = document.createDocumentFragment();

  postsData.forEach(({id, url, likes, comments, description}) => {
    const thumbnail = thumbnailTeamplate.cloneNode(true);
    const image = thumbnail.querySelector('.picture__img');

    image.dataset.id = id;
    image.src = url;
    image.alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes.toString();
    thumbnail.querySelector('.picture__comments').textContent = comments.length.toString();

    thumbnailsFragment.append(thumbnail);
  });

  thumbnailsContainerElement.append(thumbnailsFragment);
  thumbnailsContainerElement.addEventListener('click', onThumbnailClick);
};

export { renderThumbnails };
