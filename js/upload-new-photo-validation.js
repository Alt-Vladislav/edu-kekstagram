import { getHashtags, checkFirstSymbol, checkLength, checkSpacesBetween, checkRepeat } from './functions-validation';

const MAX_LENGTH_HASHTAG = 20;
const MAX_LENGTH_DESCRIPTION = 140;
const MAX_NUMBER_HASHTAGS = 5;
const REGULAR_EXPRESSION = /^#[a-zа-яё0-9]{1,20}$/;

let pristine;
let hashtagsLinkElement;
let descriptionLinkElement;
let hashtags = [];
let errorTextHashtegs = 'ошибка валидации хештега';


const checkHashtagsValidity = (hashtegsString) => {
  hashtags = getHashtags(hashtegsString);

  if (checkFirstSymbol(hashtegsString)) {
    errorTextHashtegs = 'хэштег должен начинаеться c символа # (решётка)';
    return false;
  } else if (checkSpacesBetween(hashtags)) {
    errorTextHashtegs = 'хэштеги должны разделяться пробелами';
    return false;
  } else if (hashtags.some((element) => element.trimEnd() === '#')) {
    errorTextHashtegs = 'хеш-тег не может состоять только из одной решётки';
    return false;
  } else if (hashtags.some((element) => checkLength(element, MAX_LENGTH_HASHTAG))) {
    errorTextHashtegs = `максимальная длина одного хэштега ${MAX_LENGTH_HASHTAG} символов`;
    return false;
  } else if (hashtags.some((element) => !REGULAR_EXPRESSION.test(element.trimEnd()))) {
    errorTextHashtegs = 'хештег содержит недопустимые символы';
    return false;
  } else if (checkRepeat(hashtags)) {
    errorTextHashtegs = 'один и тот же хэштег не может быть использован дважды';
    return false;
  } else if (hashtags.length > MAX_NUMBER_HASHTAGS) {
    errorTextHashtegs = `нельзя указать больше ${MAX_NUMBER_HASHTAGS} хэштегов`;
    return false;
  }

  return true;
};

const checkDescriptionValidity = (value) => !checkLength(value.trimEnd(), MAX_LENGTH_DESCRIPTION);

const getErrorMessage = () => errorTextHashtegs;


const initUploadFormValidation = (form, hashtagsInput, descriptionInput) => {
  const prisitineConfig = {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error'
  };
  const pristineInit = new Pristine(form, prisitineConfig);


  pristineInit.addValidator(hashtagsInput, checkHashtagsValidity, getErrorMessage);
  pristineInit.addValidator(descriptionInput, checkDescriptionValidity, `не больше ${MAX_LENGTH_DESCRIPTION} символов`);
  pristine = pristineInit;
  hashtagsLinkElement = hashtagsInput;
  descriptionLinkElement = descriptionInput;
};

const getValidationResult = () => pristine.validate(hashtagsLinkElement) && pristine.validate(descriptionLinkElement);

const resetValidation = () => pristine.reset();

export { initUploadFormValidation, getValidationResult, resetValidation };
