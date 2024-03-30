import { initUploadFormValidation } from './upload-new-photo-validation';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
const popupEditorContainerELement = uploadFormElement.querySelector('.img-upload__overlay');
const cancelButtonElement = popupEditorContainerELement.querySelector('#upload-cancel');
const hashtagsInputElement = popupEditorContainerELement.querySelector('.text__hashtags');
const descriptionInputElement = popupEditorContainerELement.querySelector('.text__description');


const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadForm();
  }
};
const onCancelButtonCleack = () => {
  closeUploadForm();
};


function closeUploadForm () {
  uploadFileInputElement.value = '';

  document.removeEventListener('keydown', onEscKeydown);
  cancelButtonElement.removeEventListener('click', onCancelButtonCleack);

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

    //тут будет добавление события на sumbit. Надо будет сбросить если поле хештегов и поле описания вся из пробелов. использовать метод .trim()
    // hashtagsInputElement.addEventListener('input', () => {
    //   var valid = pristine.validate(hashtagsInputElement);
    //   console.log(valid);
    // });
  });
};


export { initUploadForm };
