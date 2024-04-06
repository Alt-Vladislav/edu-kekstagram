import { renderThumbnails } from './thumbnails-renderer';
import { debounce } from './util.js';

const CLASS_ACTIVE_BUTTON = 'img-filters__button--active';
const POSTS_RANDOM_NUMBER = 10;
const DELAY_BETWEEN_CALL = 500;
const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const imagesFiltersElement = document.querySelector('.img-filters');
const imagesFiltersButtonsElements = imagesFiltersElement.querySelectorAll('.img-filters__button');
const debounceRenderThumbnails = debounce(renderThumbnails, DELAY_BETWEEN_CALL);


function selectData (selectFilter, inputData) {
  switch (selectFilter) {
    case Filters.DEFAULT:
      return inputData;
    case Filters.DISCUSSED:
      return inputData.toSorted((postA, postB) => postB.comments.length - postA.comments.length);
    case Filters.RANDOM:
      return inputData.toSorted(() => 0.5 - Math.random()).slice(0, POSTS_RANDOM_NUMBER);
  }
}

const initThumbnailsFilter = (dataFromServer) => {
  const onButtonsClick = (evt) => {
    if ((evt.target.tagName === 'BUTTON') && !evt.target.classList.contains(CLASS_ACTIVE_BUTTON)) {
      imagesFiltersButtonsElements.forEach((button) => button.classList.remove(CLASS_ACTIVE_BUTTON));
      evt.target.classList.add(CLASS_ACTIVE_BUTTON);

      debounceRenderThumbnails(selectData(evt.target.id, dataFromServer));
    }
  };

  imagesFiltersElement.classList.remove('img-filters--inactive');
  imagesFiltersElement.addEventListener('click', onButtonsClick);
};


export { initThumbnailsFilter };
