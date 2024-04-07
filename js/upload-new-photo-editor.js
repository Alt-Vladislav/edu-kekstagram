import { changeZoom, initEffect, setEffect, updateEffectIntensity } from './functions-editor';
import { showAlert } from './message-renderer.js';

const FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ZoomLimits = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

let imagePreviewElement;
let buttonSmallerElement;
let buttonBiggerElement;
let scaleValueInputElement;
let sliderWrapperElement;
let sliderContainerElement;
let effectLevelInputElement;
let effectsContainerElement;
let effectsPreviewElements;
let firstRadioBtnElement;
let currentScale = ZoomLimits.MAX;


const onButtonBiggerClick = () => {
  if (currentScale < ZoomLimits.MAX) {
    currentScale += ZoomLimits.STEP;
    changeZoom(imagePreviewElement, scaleValueInputElement, currentScale);
  }
};
const onButtonSmallerClick = () => {
  if (currentScale > ZoomLimits.MIN) {
    currentScale -= ZoomLimits.STEP;
    changeZoom(imagePreviewElement, scaleValueInputElement, currentScale);
  }
};
const onEffectsContainerClick = (evt) => {
  if (evt.target.tagName === 'INPUT') {
    setEffect(evt.target.value);
  }
};

const setDefaults = () => {
  currentScale = ZoomLimits.MAX;
  changeZoom(imagePreviewElement, scaleValueInputElement, currentScale);
  setEffect('none');
  firstRadioBtnElement.toggleAttribute('checked', true);
};


const initUploadFormEditor = (form) => {
  imagePreviewElement = form.querySelector('.img-upload__preview img');
  buttonSmallerElement = form.querySelector('.scale__control--smaller');
  buttonBiggerElement = form.querySelector('.scale__control--bigger');
  scaleValueInputElement = form.querySelector('.scale__control--value');
  sliderWrapperElement = form.querySelector('.img-upload__effect-level');
  sliderContainerElement = sliderWrapperElement.querySelector('.effect-level__slider');
  effectLevelInputElement = sliderWrapperElement.querySelector('.effect-level__value');
  effectsContainerElement = form.querySelector('.effects__list');
  effectsPreviewElements = effectsContainerElement.querySelectorAll('.effects__preview');
  firstRadioBtnElement = effectsContainerElement.querySelector('input[value="none"]');

  initEffect(imagePreviewElement, sliderWrapperElement, sliderContainerElement, effectLevelInputElement);

  noUiSlider.create(sliderContainerElement, {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => +value,
      from: (value) => +value,
    }
  });
  sliderContainerElement.noUiSlider.on('update', updateEffectIntensity);
};

const changeImagePreview = (inputFileElement) => {
  const file = inputFileElement.files[0];
  const linkOnFile = URL.createObjectURL(file);

  if (FILE_TYPES.includes(file.type)) {
    imagePreviewElement.src = linkOnFile;
    effectsPreviewElements.forEach((previewImage) => {
      previewImage.style.setProperty('background-image', `url(${linkOnFile})`);
    });
  } else {
    showAlert('Можно загружать только изображение');
  }
};

const activateEditor = () => {
  setDefaults();
  buttonBiggerElement.addEventListener('click', onButtonBiggerClick);
  buttonSmallerElement.addEventListener('click', onButtonSmallerClick);
  effectsContainerElement.addEventListener('click', onEffectsContainerClick);
};

const deactivateEditor = () => {
  setDefaults();
  buttonBiggerElement.removeEventListener('click', onButtonBiggerClick);
  buttonSmallerElement.removeEventListener('click', onButtonSmallerClick);
  effectsContainerElement.removeEventListener('click', onEffectsContainerClick);
};


export { initUploadFormEditor, changeImagePreview, activateEditor, deactivateEditor };
