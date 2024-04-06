import { initUploadFormValidation, getValidationResult, resetValidation } from './upload-new-photo-validation';
import { initUploadFormEditor, changeImagePreview, activateEditor, deactivateEditor } from './upload-new-photo-editor';
import { showSendingResultMessage } from './message-renderer.js';
import { sendData } from './api';

const ButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Опубликовываю'
};

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
const popupEditorContainerELement = uploadFormElement.querySelector('.img-upload__overlay');
const cancelButtonElement = popupEditorContainerELement.querySelector('#upload-cancel');
const submitButtonElement = popupEditorContainerELement.querySelector('#upload-submit');
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
  evt.preventDefault();

  if (getValidationResult()) {
    submitButtonElement.toggleAttribute('disabled', true);
    submitButtonElement.textContent = ButtonText.SENDING;
    hashtagsInputElement.value = hashtagsInputElement.value.trim().replaceAll(/\s+/g, ' ');
    descriptionInputElement.value = descriptionInputElement.value.trim();

    sendData(new FormData(evt.target))
      .then(() => showSendingResultMessage(true, closeUploadForm))
      .catch(() => showSendingResultMessage(false))
      .finally(() => {
        submitButtonElement.toggleAttribute('disabled', false);
        submitButtonElement.textContent = ButtonText.DEFAULT;
      });
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
    changeImagePreview(uploadFileInputElement);
    activateEditor();
    popupEditorContainerELement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onEscKeydown);
    cancelButtonElement.addEventListener('click', onCancelButtonClick);
    uploadFormElement.addEventListener('submit', onFormSubmit);
  });
};


export { initUploadForm };
