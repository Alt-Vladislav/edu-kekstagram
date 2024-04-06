const TIMEOUT_ERROR = 5000;

const errorServerTeamplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorSendImageTeamplate = document.querySelector('#error').content.querySelector('.error');
const successSendImageTeamplate = document.querySelector('#success').content.querySelector('.success');


const showAlert = (errorText) => {
  const errorMessageElement = errorServerTeamplate.cloneNode(true);
  errorMessageElement.children[0].textContent = errorText;

  document.body.append(errorMessageElement);
  setTimeout(() => errorMessageElement.remove(), TIMEOUT_ERROR);
};


const showSendingResultMessage = (isSuccess, callback) => {
  let messageElement;
  let closeButtonElement;
  if (isSuccess) {
    messageElement = successSendImageTeamplate.cloneNode(true);
    closeButtonElement = messageElement.querySelector('.success__button');
  } else {
    messageElement = errorSendImageTeamplate.cloneNode(true);
    closeButtonElement = messageElement.querySelector('.error__button');
  }

  if (callback) {
    callback();
  }
  closeButtonElement.addEventListener('click', closeMessage);
  messageElement.addEventListener('click', onOutsideClick);
  document.body.addEventListener('keydown', onEscKeydown);
  document.body.append(messageElement);


  function closeMessage () {
    closeButtonElement.removeEventListener('click', closeMessage);
    messageElement.removeEventListener('click', onOutsideClick);
    document.body.removeEventListener('keydown', onEscKeydown);
    messageElement.remove();
  }

  function onOutsideClick (evt) {
    if (evt.target === messageElement) {
      closeMessage();
    }
  }

  function onEscKeydown (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
      evt.stopPropagation();
    }
  }
};


export{ showAlert, showSendingResultMessage };
