const TIMEOUT_ERROR = 5000;
const errorServerTeamplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showAlerServer = (errorText) => {
  const errorMessageElement = errorServerTeamplate.cloneNode(true);
  errorMessageElement.children[0].textContent = errorText;

  document.body.append(errorMessageElement);
  setTimeout(() => errorMessageElement.remove(), TIMEOUT_ERROR);
};


export{ showAlerServer };
