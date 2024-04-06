const generateComment = ({avatar, message, name}) => {
  const textLi = '<li class="social__comment">';
  const textImg = `<img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">`;
  const textP = `<p class="social__text">${message}</p></li>`;

  return textLi + textImg + textP;
};

const debounce = (callback, timeoutDelay = 0) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export{ generateComment, debounce };
