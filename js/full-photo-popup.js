import { addCommets, deleteComments } from './full-photo-comments.js';

const bigPictureContainerELement = document.querySelector('.big-picture');
const imageElement = bigPictureContainerELement.querySelector('.big-picture__img').querySelector('img');
const closeButtonElement = bigPictureContainerELement.querySelector('.big-picture__cancel');
const descriptionImageElement = bigPictureContainerELement.querySelector('.social__caption');
const likesCountElement = bigPictureContainerELement.querySelector('.likes-count');
let postsData = [];

const initOpenFullPhoto = (dataFromServer) => {
  postsData = dataFromServer;
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullPhoto();
  }
};

const onCloseButtonCleack = (evt) => {
  evt.preventDefault();
  closeFullPhoto();
};


function closeFullPhoto () {
  document.removeEventListener('keydown', onEscKeydown);
  closeButtonElement.removeEventListener('click', onCloseButtonCleack);

  document.body.classList.remove('modal-open');
  bigPictureContainerELement.classList.add('hidden');

  deleteComments();
}


const openFullPhoto = (idPosts) => {
  const {url, likes, comments, description} = postsData[idPosts];

  imageElement.src = url;
  imageElement.alt = description;
  descriptionImageElement.textContent = description;
  likesCountElement.textContent = likes.toString();

  addCommets(comments);

  document.addEventListener('keydown', onEscKeydown);
  closeButtonElement.addEventListener('click', onCloseButtonCleack);

  document.body.classList.add('modal-open');
  bigPictureContainerELement.classList.remove('hidden');
};


export { openFullPhoto, initOpenFullPhoto };
