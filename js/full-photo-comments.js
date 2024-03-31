import { generateComment } from './util.js';

const COMMENTS_PER_ACTION = 5;

const bigPictureContainerElement = document.querySelector('.big-picture');
const commentInputElement = bigPictureContainerElement.querySelector('.social__footer-text');
const commentsContainerElement = bigPictureContainerElement.querySelector('.social__comments');
const commentsLoadButtonElement = bigPictureContainerElement.querySelector('.comments-loader');
const commentsCounterContainerElement = bigPictureContainerElement.querySelector('.social__comment-count');
const commentsShownCountElement = commentsCounterContainerElement.querySelector('.social__comment-shown-count');
const commentsTotalCountElement = commentsCounterContainerElement.querySelector('.social__comment-total-count');

let renderNextComments;


const renderComments = (comments) => {
  let indexLastShownComment = 0;
  let indexNextShownComment = 0;

  return () => {
    indexNextShownComment = indexLastShownComment + COMMENTS_PER_ACTION;

    if (indexNextShownComment >= comments.length) {
      indexNextShownComment = comments.length;
      commentsLoadButtonElement.classList.add('hidden');
    }

    for (let index = indexLastShownComment; index < indexNextShownComment; index++) {
      commentsContainerElement.insertAdjacentHTML('beforeEnd', generateComment(comments[index]));
    }

    indexLastShownComment = indexNextShownComment;
    commentsShownCountElement.textContent = indexLastShownComment.toString();
  };
};

const addCommets = (comments) => {
  commentsTotalCountElement.textContent = comments.length.toString();

  while (commentsContainerElement.firstChild) {
    commentsContainerElement.firstChild.remove();
  }

  renderNextComments = renderComments(comments);
  renderNextComments();
  commentsLoadButtonElement.addEventListener('click', renderNextComments);
};

const deleteComments = () => {
  commentsLoadButtonElement.classList.remove('hidden');
  commentsLoadButtonElement.removeEventListener('click', renderNextComments);

  commentInputElement.value = '';
};

export { addCommets, deleteComments };
