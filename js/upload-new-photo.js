import { initUploadFormValidation, getValidationResult, resetValidation } from './upload-new-photo-validation';
import { initUploadFormEditor, activateEditor, deactivateEditor } from './upload-new-photo-editor';

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
const onCancelButtonClick = () => {
  closeUploadForm();
};
const onFormSubmit = (evt) => {
  if (getValidationResult()) {
    hashtagsInputElement.value = hashtagsInputElement.value.trim().replaceAll(/\s+/g, ' ');
    descriptionInputElement.value = descriptionInputElement.value.trim();
  } else {
    evt.preventDefault();
  }
};


function closeUploadForm () {
  uploadFileInputElement.value = '';
  uploadFormElement.reset();

  document.removeEventListener('keydown', onEscKeydown);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  uploadFormElement.removeEventListener('submit', onFormSubmit);

  popupEditorContainerELement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetValidation();
  deactivateEditor();
}


const initUploadForm = () => {
  initUploadFormValidation(uploadFormElement, hashtagsInputElement, descriptionInputElement);
  initUploadFormEditor(uploadFormElement);

  uploadFileInputElement.addEventListener('change', () => {
    activateEditor();
    popupEditorContainerELement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onEscKeydown);
    cancelButtonElement.addEventListener('click', onCancelButtonClick);
    uploadFormElement.addEventListener('submit', onFormSubmit);
  });
};


export { initUploadForm };
