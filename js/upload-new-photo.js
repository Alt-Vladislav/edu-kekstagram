const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
const popupEditorContainerELement = uploadFormElement.querySelector('.img-upload__overlay');
const cancelButtonElement = popupEditorContainerELement.querySelector('#upload-cancel');

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
  uploadFileInputElement.addEventListener('change', () => {
    popupEditorContainerELement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onEscKeydown);
    cancelButtonElement.addEventListener('click', onCancelButtonCleack);
  });
};

export { initUploadForm };
