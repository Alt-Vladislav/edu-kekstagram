let firstSymbol = '';

const getHashtags = (inputString) =>
  inputString
    .toLowerCase()
    .split('#')
    .map((element) => `#${element}`)
    .slice(1);


const checkFirstSymbol = (inputString) => {
  firstSymbol = inputString.trimStart()[0];
  return (firstSymbol !== '#' && firstSymbol !== undefined);
};

const checkLength = (inputString, enableLength) => (inputString.length > enableLength);

const checkSpacesBetween = (inputHashtagsArray) => {
  if (inputHashtagsArray.length > 1) {
    for (let i = inputHashtagsArray.length - 2; i >= 0; i--) {
      if (inputHashtagsArray[i] === inputHashtagsArray[i].trimEnd()) {
        return true;
      }
    }
  }
  return false;
};

const checkRepeat = (inputHashtagsArray) => {
  if (inputHashtagsArray.length > 1) {
    return inputHashtagsArray.some((element, index, array) => {
      for (let i = index + 1; i < array.length; i++) {
        if (element.trimEnd() === array[i].trimEnd()) {
          return true;
        }
      }
    });
  }
};


export { getHashtags, checkFirstSymbol, checkLength, checkSpacesBetween, checkRepeat };
