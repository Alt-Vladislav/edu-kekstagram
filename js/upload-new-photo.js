import { initUploadFormValidation, getValidationResult } from './upload-new-photo-validation';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
const popupEditorContainerELement = uploadFormElement.querySelector('.img-upload__overlay');
const cancelButtonElement = popupEditorContainerELement.querySelector('#upload-cancel');
const hashtagsInputElement = popupEditorContainerELement.querySelector('.text__hashtags');
const descriptionInputElement = popupEditorContainerELement.querySelector('.text__description');


const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (document.activeElement === hashtagsInputElement || document.activeElement === descriptionInputElement) {
      evt.stopPropagation();
    } else {
      closeUploadForm();
    }
  }
};
const onCancelButtonCleack = () => {
  closeUploadForm();
};
const onFormSubmit = (evt) => {
  if (getValidationResult()) {
    hashtagsInputElement.value = hashtagsInputElement.value.trim();
    descriptionInputElement.value = descriptionInputElement.value.trim();
  } else {
    evt.preventDefault();
  }
};


function closeUploadForm () {
  uploadFileInputElement.value = '';

  document.removeEventListener('keydown', onEscKeydown);
  cancelButtonElement.removeEventListener('click', onCancelButtonCleack);
  uploadFormElement.removeEventListener('submit', onFormSubmit);

  popupEditorContainerELement.classList.add('hidden');
  document.body.classList.remove('modal-open');
}


const initUploadForm = () => {
  initUploadFormValidation(uploadFormElement, hashtagsInputElement, descriptionInputElement);


  uploadFileInputElement.addEventListener('change', () => {
    popupEditorContainerELement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onEscKeydown);
    cancelButtonElement.addEventListener('click', onCancelButtonCleack);
    uploadFormElement.addEventListener('submit', onFormSubmit);
  });
};


export { initUploadForm };
